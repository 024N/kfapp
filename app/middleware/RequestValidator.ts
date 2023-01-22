import {NextFunction, Request, Response} from 'express';
import {InvalidArgumentException} from '../utils/CustomError';
import {log} from '../utils/Logger';

export function requestValidator(schema: any) {
  return (req: Request, res: Response, next: NextFunction): any => {
    const params = req.params;
    const body = req.body;
    const query = req.query;
    const adminPermission = true;
    const {error, value} = schema.validate({
      params,
      body,
      query,
      adminPermission,
    });
    if (error) {
      next(
        new InvalidArgumentException(
          error.details[0].message,
          'RequestValidator'
        )
      );
      log.error(`DATA: ${JSON.stringify(value)}`);
    }
    next();
  };
}
