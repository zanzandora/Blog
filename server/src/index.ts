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
import { fileURLToPath } from 'node:url';

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
const PORT = process.env.PORT || 3000;

// // allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../dist/client');

app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter);

app.use((err: any, res: express.Response) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Something went wrong',
    status: err.status,
    stack: err.stack,
  });
});

app.use(express.static(clientDist));
app.get(/(.*)/, (_, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});
httpServer.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port  http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
