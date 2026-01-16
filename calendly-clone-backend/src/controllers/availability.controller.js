import { prisma } from "../config/db.js";

export async function getAvailability(req, res) {
  const availability = await prisma.availability.findMany();
  res.json(availability);
}
