import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create default user
  const user = await prisma.user.upsert({
    where: { id: "default-user" },
    update: {},
    create: {
      id: "default-user",
      name: "Demo User",
      timezone: "Asia/Kolkata",
    },
  });

  // 2️⃣ Create availability schedule
  const schedule = await prisma.availabilitySchedule.create({
    data: {
      userId: user.id,
      isActive: true,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Monday
          { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tuesday
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wednesday
          { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thursday
          { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" }, // Friday
        ],
      },
    },
  });

  // 3️⃣ Create event type
  const eventType = await prisma.eventType.create({
    data: {
      name: "30 Minute Meeting",
      duration: 30,
      slug: "30-min-meeting",
      bufferBefore: 0,
      bufferAfter: 0,
      userId: user.id,
    },
  });

  console.log("✅ Seed completed successfully");
  console.log("👉 Event Type:", eventType.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
