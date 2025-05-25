import express from 'express';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

import commentRouter from './routers/comment.router';
import postRouter from './routers/post.router';
import userRouter from './routers/user.router';
import contactRouter from './routers/contact.router';
import webhookRouter from './routers/webhook.router';
import { createServer } from 'node:http';
import path from 'node:path';
import connectDB from './lib/connectDB';

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(clerkMiddleware());

app.use('/webhooks', webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);
const port = 3000;

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const clientDist = path.resolve('./dist/client');
app.use(express.static(clientDist));

// Middleware
app.use(express.json());

app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Lỗi server:', err.message);

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

process.on('SIGINT', async () => {
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
