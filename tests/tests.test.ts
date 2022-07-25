import { app } from "../src/index.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import { createUser } from "./factories/userFactory.js";
import { getToken } from "./factories/sessionFactory.js";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("POST /test", () => {
  it("Create new test", async () => {
    const user = await createUser();
    const token = await getToken(user.email);
    const body = {
      name: "teste do teste",
      pdfUrl: "https://www.google.com.br",
      categoryId: 1,
      teacherDisciplineId: 3,
    };
    const result = await agent.post("/test").send(body).set({ Authorization: token });
    expect(result.statusCode).toEqual(201);
  });

  it("Create test with empty body", async () => {
    const user = await createUser();
    const token = await getToken(user.email);
    const body = {};
    const result = await agent.post("/test").send(body).set({ Authorization: token });
    expect(result.statusCode).toEqual(422);
  });

  it("Create test without token", async () => {
    const body = { name: "teste do teste", pdfUrl: "https://www.google.com.br", categoryId: 1, teacherDisciplineId: 3 };
    const result = await agent.post("/test").send(body);
    expect(result.statusCode).toEqual(401);
  });
});

describe("GET /test", () => {
  it("Get Test with group by disciplines", async () => {
    const user = await createUser();
    const token = await getToken(user.email);
    const result = await agent.get("/test?groupBy=disciplines").set({ Authorization: token });
    expect(result.statusCode).toEqual(200);
    expect(result.body).not.toBeNull();
  });
  it("Get Test with group by teachers", async () => {
    const user = await createUser();
    const token = await getToken(user.email);
    const result = await agent.get("/test?groupBy=teachers").set({ Authorization: token });
    expect(result.statusCode).toEqual(200);
    expect(result.body).not.toBeNull();
  });
  it("Get Test without group by", async () => {
    const user = await createUser();
    const token = await getToken(user.email);
    const result = await agent.get("/test").set({ Authorization: token });
    expect(result.statusCode).toEqual(422);
  });
  it("Get Test without token", async () => {
    const result = await agent.get("/test?groupBy=teachers");
    expect(result.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
