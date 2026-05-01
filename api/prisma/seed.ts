import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import "dotenv/config";
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL ?? '';
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('Pitaya.123', 10);

  // 1. Create Default Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      name: 'Voltia Core',
      slug: 'default',
    },
  });

  // 2. Create Users
  const users = [
    {
      email: 'admin@pitayacode.io',
      firstName: 'Admin',
      lastName: 'Pitaya',
      role: 'ADMIN',
    },
    {
      email: 'client@pitayacode.io',
      firstName: 'Client',
      lastName: 'Pitaya',
      role: 'USER',
    },
    {
      email: 'system@pitayacode.io',
      firstName: 'System',
      lastName: 'Pitaya',
      role: 'SUPERADMIN',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: password,
        role: user.role as any,
      },
      create: {
        email: user.email,
        password: password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as any,
        tenantId: tenant.id,
      },
    });
  }

  // 3. Create Categories
  const categories = [
    { name: 'Cables y Conductores', slug: 'cables-conductores', description: 'Cables eléctricos, conductores de cobre y aluminio' },
    { name: 'Tableros y Protecciones', slug: 'tableros-protecciones', description: 'Centros de carga, interruptores termomagnéticos y fusibles' },
    { name: 'Iluminación LED', slug: 'iluminacion-led', description: 'Reflectores, paneles, focos y luminarias industriales' },
    { name: 'Canalización y Soportería', slug: 'canalizacion-soporteria', description: 'Tubos conduit, cajas de registro y accesorios' },
    { name: 'Material de Instalación', slug: 'material-instalacion', description: 'Cintas, cinchos, conectores y aislantes' },
  ];

  const createdCategories: any[] = [];
  for (const catData of categories) {
    let category = await (prisma.category as any).findFirst({
      where: { name: catData.name, tenantId: tenant.id },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: catData.name,
          description: catData.description,
          tenantId: tenant.id,
        },
      });
    }
    createdCategories.push(category);
  }

  // 4. Create Products
  const products = [
    {
      name: 'Cable THW-2 Calibre 12 AWG Negro (100m)',
      description: 'Conductor de cobre suave con aislamiento de PVC. Resistente al calor, humedad, aceites y grasas.',
      price: 1250.00,
      stock: 50,
      sku: 'CAB-THW12-N',
      categoryName: 'Cables y Conductores',
    },
    {
      name: 'Interruptor Termomagnético Square D 1P 20A',
      description: 'Protección contra sobrecargas y cortocorticuitos. Conexión enchufable tipo QO.',
      price: 185.50,
      stock: 120,
      sku: 'INT-SQD-120',
      categoryName: 'Tableros y Protecciones',
    },
    {
      name: 'Reflector LED Industrial 100W IP65',
      description: 'Alta luminosidad, luz fría 6500K. Ideal para exteriores y bodegas.',
      price: 840.00,
      stock: 25,
      sku: 'ILL-REF-100W',
      categoryName: 'Iluminación LED',
    },
    {
      name: 'Tubo Conduit Pared Delgada 1/2" (3m)',
      description: 'Tubería metálica rígida de acero para conducción de conductores eléctricos.',
      price: 95.00,
      stock: 200,
      sku: 'CAN-TUB-12',
      categoryName: 'Canalización y Soportería',
    },
    {
      name: 'Cinta de Aislar 3M Super 33+ (19mm x 20m)',
      description: 'Cinta de PVC de grado profesional. Excelente protección dieléctrica y mecánica.',
      price: 75.20,
      stock: 500,
      sku: 'MAT-CIN-33P',
      categoryName: 'Material de Instalación',
    },
  ];

  for (const prodData of products) {
    const category = createdCategories.find(c => c.name === prodData.categoryName);
    if (!category) continue;

    const existingProduct = await prisma.product.findFirst({
      where: { sku: prodData.sku, tenantId: tenant.id },
    });

    if (existingProduct) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          price: prodData.price,
          stock: prodData.stock,
          description: prodData.description,
        },
      });
    } else {
      await prisma.product.create({
        data: {
          name: prodData.name,
          sku: prodData.sku,
          description: prodData.description,
          price: prodData.price,
          stock: prodData.stock,
          tenantId: tenant.id,
          categoryId: category.id,
          imageUrl: `https://placehold.co/600x400?text=${encodeURIComponent(prodData.name)}`,
        },
      });
    }
  }

  console.log('Seed completed successfully with Electrical Sector data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
