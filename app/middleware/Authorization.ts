import * as dotenv from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import {
  UnauthorizedException,
  LimitExceededException,
} from '../utils/CustomError';

dotenv.config({path: '.env.local'});
const api_key = process.env.API_KEY;
let api_key_limit = Number(process.env.API_KEY_LIMIT);

// Authorization Middleware
export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await apiKeyVerify(req);
  } catch (error) {
    next(error);
  }
  next();
}

async function apiKeyVerify(request: any) {
  const request_api_key = request.headers.api_key;
  if (request_api_key !== api_key) {
    throw new UnauthorizedException('Not authorized', 'Authorization');
  } else {
    api_key_limit--;
    if (api_key_limit <= 0)
      throw new LimitExceededException(
        'Api Key Limit Exceeded',
        'Authorization'
      );
  }
}
