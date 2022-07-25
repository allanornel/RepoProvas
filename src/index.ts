import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
}
