import {
  createPost,
  deletePost,
  featurePost,
  getPost,
  getPosts,
  uploadAuth,
} from '@/controllers/post.controller';
import increaseVisit from '@/middlewares/increaseVisit';
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

expressRouter.get('/', asyncHandler(getPosts));
expressRouter.get('/upload-auth', asyncHandler(uploadAuth));
expressRouter.get('/:slug', increaseVisit, asyncHandler(getPost));
expressRouter.patch('/feature', asyncHandler(featurePost));
expressRouter.post('/', requireAuth(), asyncHandler(createPost));
expressRouter.delete('/:id', requireAuth(), asyncHandler(deletePost));

export default expressRouter;
