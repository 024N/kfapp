import {NextFunction, Request, Response} from 'express';
import {log} from '../utils/Logger';
import {invalidUrlError} from '../utils/Response';

// Error Handling Middleware
export async function invalidUrlHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.error('Invalid PATH or URL was entered');
  invalidUrlError(res);
}
