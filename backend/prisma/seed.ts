import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@church.com' },
    update: {},
    create: {
      email: 'admin@church.com',
      passwordHash,
    },
  });

  console.log('Seed completed: admin@church.com / admin1234');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
