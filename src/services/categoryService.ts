import { findAll } from "../repositories/categoryRepository.js";

export async function getCategoryService() {
  const categories = await findAll();
  return categories;
}
