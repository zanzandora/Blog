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

expressRouter.get('/', getPosts);
expressRouter.get('/upload-auth', uploadAuth);
expressRouter.get('/:slug', increaseVisit, getPost);
expressRouter.patch('/feature', featurePost);
expressRouter.post('/', requireAuth(), createPost);
expressRouter.delete('/:id', requireAuth(), deletePost);

export default expressRouter;
