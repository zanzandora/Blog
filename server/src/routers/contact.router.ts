import { getContact } from '@/controllers/contact.controller';
import { Router } from 'express';

const expressRouter = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

expressRouter.post('/', asyncHandler(getContact));

export default expressRouter;
