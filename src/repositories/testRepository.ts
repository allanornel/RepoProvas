import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateTestData = Omit<Test, "id">;

export async function insert(testData: CreateTestData) {
  await prisma.test.create({ data: testData });
}

export async function getByTerms() {
  const result = await prisma.terms.findMany({
    select: {
      id: true,
      number: true,
      Discipline: {
        select: {
          id: true,
          name: true,
          TeacherDiscipline: {
            select: { 
              Test: { select: { id: true, name: true, pdfUrl: true, 
              category: { select: { id: true, name: true } } } } },
          },
        },
      },
    },
  });
}
