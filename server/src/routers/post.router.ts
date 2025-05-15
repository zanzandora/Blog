import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from '@/controllers/post.controller';
import { requireAuth } from '@clerk/express';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/', getPosts);
expressRouter.get('/:slug', getPost);
expressRouter.post('/', requireAuth(), createPost);
expressRouter.delete('/:id', requireAuth(), deletePost);

export default expressRouter;
