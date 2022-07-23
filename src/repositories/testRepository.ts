import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateTestData = Omit<Test, "id">;

export async function insert(testData: CreateTestData) {
  await prisma.test.create({ data: testData });
}

export async function getTestsGroupByTerms() {
  const result = await prisma.terms.findMany({
    orderBy: { number: "asc" },
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: { discipline: {}, teacher: {}, tests: { select: { id: true, name: true, pdfUrl: true, category: true } } },
          },
        },
      },
    },
  });
  return result;
}

export async function getTestsGroupByTeacher() {
  const result = await prisma.teacherDisciplines.findMany({
    include: { teacher: {}, discipline: { include: { term: {} } }, tests: { include: { category: {} } } },
  });
  return result;
}
