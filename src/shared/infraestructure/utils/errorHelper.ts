export interface CustomError extends Error {
  statusCode?: number
}

export const throwError = (
  message: string,
  statusCode: number
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};
