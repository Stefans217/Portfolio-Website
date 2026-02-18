import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.');
    console.error('Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpass npx tsx prisma/seed.ts');
    process.exit(1);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log(`Admin user upserted: ${user.email} (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
