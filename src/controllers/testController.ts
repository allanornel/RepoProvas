import { Request, Response } from "express";
import { CreateTestData } from "../repositories/testRepository.js";
import { createTestService, getTestsByTeacher, getTestsByTerms } from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testData: CreateTestData = req.body;
  await createTestService(testData);
  res.sendStatus(201);
}

export async function getTest(req: Request, res: Response) {
  const query = req.query.groupBy;
  if (!query) {
    return res.status(422).send("É necessário enviar a query groupBy");
  }
  if (query === "disciplines") {
    const response = await getTestsByTerms();
    res.send(response);
  } else if (query === "teachers") {
    const response = await getTestsByTeacher();
    res.send(response);
  } else {
    return res.status(422).send("É necessário enviar através da query groupBy: disciplines ou teachers");
  }
}
