import { CreateTestData } from "../repositories/testRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teacherDisciplineRepository from "../repositories/teachersDisciplinesRepository.js";
import * as testRepository from "../repositories/testRepository.js";

export async function createTestService(testData: CreateTestData) {
  const { categoryId, teacherDisciplineId } = testData;
  const findCategory = await categoryRepository.findById(categoryId);
  if (!findCategory)
    throw {
      type: "Category not found",
      message: "Categoria não encontrada",
      statusCode: 404,
    };

  const findTeacherDiscipline = await teacherDisciplineRepository.findById(teacherDisciplineId);
  if (!findTeacherDiscipline)
    throw {
      type: "Relations of Teacher and Discplines not found",
      message: "Relacionamento não encontrado",
      statusCode: 404,
    };

  await testRepository.insert(testData);
}

export async function getTestsByDiscipline() {}
