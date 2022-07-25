import jwt from "jsonwebtoken";

export async function getToken(email) {
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}
