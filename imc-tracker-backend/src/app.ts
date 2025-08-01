import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import userTokenRouter from "./routers/userTokenRouter";
import bmiEvaluationRouter from "./routers/bmiEvaluationRouter";
import { errorHandler } from "./common/errorHandler";

const app = express();

app.use(morgan("tiny"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/bmi/evaluations", bmiEvaluationRouter);
app.use("/users/token", userTokenRouter);
app.use("/users", userRouter);

app.use((_req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use(errorHandler);

export default app;
