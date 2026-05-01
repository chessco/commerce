import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenants = await prisma.tenant.findMany();
  console.log('Tenants:', tenants.length);
  for (const t of tenants) {
    console.log(`- ${t.name} (${t.id}) [${t.slug}]`);
  }

  const products = await prisma.product.findMany();
  console.log('Products:', products.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
