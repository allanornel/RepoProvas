import prisma from "../config/database.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id">;

export async function findByEmail(email: string) {
  const result = await prisma.user.findUnique({ where: { email } });
  return result;
}

export async function insert(userData: CreateUserData) {
  await prisma.user.create({ data: userData });
}
