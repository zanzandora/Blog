import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';

import commentRouter from './routers/comment.router';
import postRouter from './routers/post.router';
import userRouter from './routers/user.router';
import webhookRouter from './routers/webhook.router';
import { createServer } from 'node:http';
import path from 'node:path';
import connectDB from './lib/connectDB';

dotenv.config();

const app = express();
app.use(clerkMiddleware());

app.use('/webhooks', webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);
const port = 3000;

const clientDist = path.resolve('./dist/client');
app.use(express.static(clientDist));

// Middleware
app.use(express.json());

app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({
      message: err.message || 'Something went wrong',
      status: err.status,
      stack: err.stack,
    });
  }
);

httpServer.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port  http://localhost:${port}`);
});
