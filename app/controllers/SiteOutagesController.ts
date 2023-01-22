import express, {Request, Response, NextFunction} from 'express';
import {OutagesService} from '../services/OutagesService';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {EnhancedOutages} from '../models/schema/EnhancedOutages';

const router = express.Router();
const outagesService = new OutagesService();

router.post(
  '/:siteId',
  requestValidator(EnhancedOutages),
  async (req: Request, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId;
    const body = req.body;

    const response = await outagesService.saveOutages(siteId, body).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

export default router;
