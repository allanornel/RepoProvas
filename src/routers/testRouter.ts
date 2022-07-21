import { Router } from "express";
import { createTest } from "../controllers/testController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postTestSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.use(validateToken);
testRouter.post("/test", validateSchema(postTestSchema), createTest);

export default testRouter;
