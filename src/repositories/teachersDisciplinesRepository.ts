import prisma from "../config/database.js";

export async function findById(id: number) {
  const result = prisma.teacherDisciplines.findUnique({ where: { id } });
  return result;
}
