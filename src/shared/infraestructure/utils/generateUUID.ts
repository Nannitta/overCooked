import crypto from "node:crypto";
import type { UUID } from "crypto";

export const generateUUID = (): UUID => {
  const id = crypto.randomUUID();
  return id;
};
