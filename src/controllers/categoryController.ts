import { Request, Response } from "express";
import { getCategoryService } from "../services/categoryService.js";

export async function getCategory(req: Request, res: Response) {
  const categories = await getCategoryService();
  res.send(categories);
}
