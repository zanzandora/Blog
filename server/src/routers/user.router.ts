import { getUserSavedPosts, savePost } from '@/controllers/user.controller';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/saved', getUserSavedPosts);
expressRouter.patch('/save', savePost);

export default expressRouter;
