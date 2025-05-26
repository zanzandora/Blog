import { getContact } from '@/controllers/contact.controller';
import { Router, Request, Response, NextFunction } from 'express';

const expressRouter = Router();

// Định nghĩa asyncHandler để wrap các controller async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

expressRouter.post('/', asyncHandler(getContact));

export default expressRouter;
