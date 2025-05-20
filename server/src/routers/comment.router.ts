import {
  createComment,
  deleteComment,
  getComment,
} from '@/controllers/comment.controller';
import { requireAuth } from '@clerk/express';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/:postId', getComment);
expressRouter.post('/:postId', requireAuth(), createComment);
expressRouter.delete('/:id', requireAuth(), deleteComment);

export default expressRouter;
