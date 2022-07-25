import { app } from "../src/index.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { createUser } from "./factories/userFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /sign-up", () => {
  it("Generate a valid sign up", async () => {
    const body = {
      email: "test@gmail.com",
      password: "12345",
      passwordConfirmation: "12345",
    };

    const result = await agent.post("/sign-up").send(body);
    expect(result.statusCode).toEqual(201);
  });
  it("Sign up with empty body", async () => {
    const body = {};
    const result = await agent.post("/sign-up").send(body);
    expect(result.statusCode).toEqual(422);
  });

  it("Sign up with empty body", async () => {
    const body = {
      email: "repetido@gmail.com",
      password: "12345",
      passwordConfirmation: "12345",
    };
    const result1 = await agent.post("/sign-up").send(body);
    expect(result1.statusCode).toEqual(201);
    const result2 = await agent.post("/sign-up").send(body);
    expect(result2.statusCode).toEqual(409);
  });
});

describe("POST /sign-in", () => {
  it("Sign In with a Valid data", async () => {
    const user = await createUser();
    const response = await agent.post("/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
  });
  it("Sign in With a empty body", async () => {
    const body = {};
    const result = await agent.post("/sign-in").send(body);
    expect(result.statusCode).toEqual(422);
  });
  it("Sign in With a wrong data", async () => {
    const body = {
      email: "emailqlqr@gmail.com",
      password: "12345688878787789",
    };
    const result = await agent.post("/sign-in").send(body);
    expect(result.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
