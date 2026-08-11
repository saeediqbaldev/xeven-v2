import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "Saeeddev307127";
  const password = process.env.SEED_ADMIN_PASSWORD || "Saeed@@2026&&307127^/Xeven";

  const passwordHash = await argon2.hash(password);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      role: "ADMIN",
      passwordHash,
      isActive: true,
    },
  });

  await prisma.themeSetting.upsert({
    where: { key: "active" },
    update: {},
    create: { key: "active" },
  });

  console.log(`Seeded super admin user: ${username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
