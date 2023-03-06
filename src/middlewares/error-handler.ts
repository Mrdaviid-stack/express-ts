import { Request, Response, NextFunction } from 'express';

import { getErrorCodeMessage } from './error-thrower';

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  const { name } = error;
  let errorCode = error.status ? error.status :
    name === 'UnauthorizedError' ? 401 :
    name === 'SyntaxError' ? 400 : null;

  response.status(errorCode).send(getErrorCodeMessage(errorCode))
}
