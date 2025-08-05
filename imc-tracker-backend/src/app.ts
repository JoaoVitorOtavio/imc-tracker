import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import userTokenRouter from "./routers/userTokenRouter";
import bmiEvaluationRouter from "./routers/bmiEvaluationRouter";
import { errorHandler } from "./common/errorHandler";
import authRouter from "./routers/authRouter";
import { FRONT_URL } from "./common/constants";

const app = express();

app.use(morgan("tiny"));

app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(helmet());

app.use(express.json());

app.use("/bmi/evaluations", bmiEvaluationRouter);
app.use("/users/token", userTokenRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((_req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use(errorHandler);

export default app;
