import express, {Request, Response, NextFunction} from 'express';
import {OutagesService} from '../services/OutagesService';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {Outages} from '../models/schema/Outages';

const router = express.Router();
const outagesService = new OutagesService();

router.get(
  '/',
  requestValidator(Outages),
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await outagesService.getOutages().catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);
export default router;
