import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: 'default' } });
  if (tenant) console.log(tenant.id);
  else console.log('not found');
}
main().catch(console.error).finally(() => prisma.$disconnect());
