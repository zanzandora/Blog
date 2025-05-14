import { clerkWebhook } from '@/controllers/webhook.controller';
import bodyParser from 'body-parser';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.post(
  '/clerk',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhook
);

export default expressRouter;
