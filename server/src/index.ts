import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send(process.env.Test);
});

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
