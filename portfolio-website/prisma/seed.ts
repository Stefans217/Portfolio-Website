/**
 * Database seed script.
 * Creates the initial admin user with a properly hashed password.
 *
 * Usage:
 *   npx tsx prisma/seed.ts
 *
 * Environment variables required:
 *   ADMIN_EMAIL    – admin login email
 *   ADMIN_PASSWORD – admin login password (will be hashed)
 *   ADMIN_NAME     – (optional) display name
 *   DATABASE_URL   – Prisma connection string
 */
import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? 'Admin';

  if (!email || !password) {
    console.error(
      'Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.\n' +
        'Example:\n' +
        '  ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=supersecret npx tsx prisma/seed.ts'
    );
    process.exit(1);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, name },
    create: { email, password: hashedPassword, name },
  });

  console.log(`✅ Admin user seeded: ${user.email} (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
