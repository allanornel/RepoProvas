import prisma from "../config/database";

export async function findById(id: number) {
  const result = prisma.teacherDiscipline.findUnique({ where: { id } });
  return result;
}
