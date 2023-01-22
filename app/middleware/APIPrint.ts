import {NextFunction, Request, Response} from 'express';
import {log} from '../utils/Logger';

// Log Handling Middleware
export async function apiPrint(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.info(`###### CALLED API: ${req.method} ${req.path} ######`);
  next();
}
