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
      Discipline: {
        include: {
          TeacherDiscipline: {
            include: {
              discipline: {},
              teacher: {},
              Test: {
                include: { category: {} },
              },
            },
          },
        },
      },
    },
  });
  return result;
}

export async function getTestsGroupByTeacher() {
  const result = await prisma.teacherDiscipline.findMany({
    include: { teacher: {}, discipline: { include: { term: {} } }, Test: { include: { category: {} } } },
  });
  return result;
}
