import { prisma } from "../config/db.js";

export async function getEventTypes(req, res) {
  const events = await prisma.eventType.findMany();
  res.json(events);
}

export async function createEventType(req, res) {
  const { name, duration, slug } = req.body;

  const event = await prisma.eventType.create({
    data: {
      name,
      duration,
      slug,
      userId: "default-user"
    }
  });

  res.json(event);
}
