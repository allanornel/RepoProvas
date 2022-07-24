import { Router } from "express";
import { getCategory } from "../controllers/categoryController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.use(validateToken);
categoryRouter.get("/category", getCategory);

export default categoryRouter;
