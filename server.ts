import express from "express";
import "dotenv/config";
import type { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./src/shared/infraestructure/restApi/userRouter.ts";
import { exceptionHandler } from "./src/shared/aplicación/middlewares/exceptionHandler.ts";
import type { Server } from "http";
import { storageRouter } from "./src/shared/infraestructure/restApi/storageRouter.ts";

const { NODE_DOCKER_PORT, START_SERVER } = process.env;

export const app: Application = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/storage", storageRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  exceptionHandler(err, res);
  next();
});

app.use((_: Request, res: Response) => {
  res.status(404).send({
    message: "No encontrado",
  });
});

let server: Server | null = null;

if (START_SERVER && START_SERVER.toLowerCase() === "true") {
  server = app.listen(NODE_DOCKER_PORT ?? 3000, () => {
    console.log(`Server listening at http://localhost:${NODE_DOCKER_PORT}`);
  });
}

export function closeServer(): void {
  if (server) {
    server.close();
  }
}
