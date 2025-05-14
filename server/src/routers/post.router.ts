import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from '@/controllers/post.controller';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/', getPosts);
expressRouter.get('/:slug', getPost);
expressRouter.post('/', createPost);
expressRouter.delete('/:id', deletePost);

export default expressRouter;
