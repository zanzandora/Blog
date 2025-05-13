import express from 'express';
import dotenv from 'dotenv';

import commentRouter from './routers/comment.router';
import { createServer } from 'node:http';
import path from 'node:path';
import connectDB from './lib/connectDB';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = 3000;

const clientDist = path.resolve('./dist/client');
app.use(express.static(clientDist));

// Middleware
app.use(express.json());

app.use('/comment', commentRouter);

httpServer.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port  http://localhost:${port}`);
});
