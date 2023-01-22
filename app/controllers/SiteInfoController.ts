import express, {Request, Response, NextFunction} from 'express';
import {OutagesService} from '../services/OutagesService';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {SiteInfo} from '../models/schema/SiteInfo';

const router = express.Router();
const outagesService = new OutagesService();

router.get(
  '/:siteId',
  requestValidator(SiteInfo),
  async (req: Request, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId;
    const response = await outagesService.getSiteInfo(siteId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);
export default router;
