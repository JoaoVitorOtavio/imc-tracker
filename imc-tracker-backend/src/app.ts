import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter";

const app = express();

app.use(morgan("tiny"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/users", userRouter);

app.use((_req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((error: Error, _req: Request, res: Response) => {
  res.status(500).send(error.message);
});

export default app;
