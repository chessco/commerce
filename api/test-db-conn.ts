import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import "dotenv/config";

async function test() {
  const connectionString = process.env.DATABASE_URL ?? '';
  console.log('Connecting to:', connectionString);
  const adapter = new PrismaMariaDb(connectionString);
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    console.log('Connected successfully!');
    const tenants = await prisma.tenant.findMany();
    console.log('Tenants:', tenants);
  } catch (e) {
    console.error('Connection failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
