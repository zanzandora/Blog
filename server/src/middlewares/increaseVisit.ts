import postModel from '@/models/post.model';
import { Request, Response, NextFunction } from 'express';

const increaseVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug;

  await postModel.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });

  res.json({ message: 'Visit count increased' });

  next();
};

export default increaseVisit;
