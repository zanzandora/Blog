import {
  getUserSavedPosts,
  savePost,
  getSavedPosts,
} from '@/controllers/user.controller';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/saved', getUserSavedPosts);
expressRouter.patch('/save', savePost);
expressRouter.get('/saved-posts', getSavedPosts);

export default expressRouter;
