import joi from "joi";
import { CreateUserData } from "../repositories/authRepository.js";

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(10),
  passwordConfirmation: joi.string().valid(joi.ref("password")).required(),
});

export const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
