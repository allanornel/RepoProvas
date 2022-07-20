import { CreateUserData, findByEmail, insert } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUpService(userData: CreateUserData) {
  userData.email = userData.email.toLowerCase();
  const { email, password } = userData;
  const checkEmail = await findByEmail(email);
  if (checkEmail)
    throw {
      type: "User with this email already exists",
      message: "Email já cadastrado",
      statusCode: 409,
    };

  const salt = 10;
  userData.password = await bcrypt.hash(password, salt);
  await insert(userData);
}

export async function signInService(userData: CreateUserData) {
  const { email, password } = userData;
  const user = await findByEmail(email);
  console.log(user);
  if (!user)
    throw {
      type: "Wrong email/password",
      message: "Email/Senha incorretos",
      statusCode: 401,
    };

  if (!(await bcrypt.compare(password, user.password)))
    throw {
      type: "Wrong email/password",
      message: "Email/Senha incorretos",
      statusCode: 401,
    };

  const token = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });

  return token;
}
