import { Request, Response } from "express";
import { CreateTestData } from "../repositories/testRepository.js";
import { createTestService, getTestsByTerms } from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testData: CreateTestData = req.body;
  await createTestService(testData);
  res.sendStatus(201);
}

export async function getTest(req: Request, res: Response) {
  const response = await getTestsByTerms();
  res.send(response);
}
