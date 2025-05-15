import { Router } from 'express';

const expressRouter = Router();

expressRouter.get('/list', (req, res) => {
  res.send('comment found!!!!!!!');
});

export default expressRouter;
