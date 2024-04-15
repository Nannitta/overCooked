import type { NextFunction, Request, Response } from "express";

export interface Controller {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
