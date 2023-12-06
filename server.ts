import express from "express";
import "dotenv/config";
import type { Request, Response } from "express";
import type { CustomError } from "./src/helpers/errorHelper";

const { PORT } = process.env;

export const app = express();

app.use((err: CustomError, _: Request, res: Response) => {
  console.error(err);

  const errorCode: number = err.statusCode ?? 500;

  res.status(errorCode).send({
    error: err.message,
  });
});

app.use((_: Request, res: Response) => {
  res.status(404).send({
    message: "No encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
