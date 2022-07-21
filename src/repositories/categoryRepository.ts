import prisma from "../config/database.js";

export async function findById(id: number) {
  const result = await prisma.category.findUnique({ where: { id } });
  return result;
}
