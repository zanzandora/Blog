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
import { Router } from 'express';

const expressRouter = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

expressRouter.get('/', asyncHandler(getPosts));
expressRouter.get('/upload-auth', uploadAuth);
expressRouter.get('/:slug', increaseVisit, asyncHandler(getPost));
expressRouter.patch('/feature', asyncHandler(featurePost));
expressRouter.post('/', requireAuth(), asyncHandler(createPost));
expressRouter.delete('/:id', requireAuth(), asyncHandler(deletePost));

export default expressRouter;
