import {
  createComment,
  deleteComment,
  getComment,
} from '@/controllers/comment.controller';
import { requireAuth } from '@clerk/express';
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

expressRouter.get('/:postId', asyncHandler(getComment));
expressRouter.post('/:postId', requireAuth(), asyncHandler(createComment));
expressRouter.delete('/:id', requireAuth(), asyncHandler(deleteComment));

export default expressRouter;
