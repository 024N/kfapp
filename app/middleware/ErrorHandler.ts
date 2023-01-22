import {NextFunction, Request, Response} from 'express';
import {CustomError} from '../utils/CustomError';
import {log} from '../utils/Logger';
import {sendError} from '../utils/Response';

// Error Handling Middleware
export async function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.error(
    `Error occurred In ${error.methodName} # [ErrorName]: ${error.name} # [ErrorMessage]: ${error.message}`
  );
  sendError(res, error.responseMessage, error.statusCode);
}
