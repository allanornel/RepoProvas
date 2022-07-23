import { Router } from "express";
import { getCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

// categoryRouter.use(validateToken);
categoryRouter.get("/category", getCategory);

export default categoryRouter;
