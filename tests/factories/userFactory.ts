import prisma from "../../src/config/database.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: "123456",
  };

  const insertedUser = await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
    },
  });

  return user;
}
