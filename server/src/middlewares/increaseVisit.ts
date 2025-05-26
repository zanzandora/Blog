import postModel from '@/models/post.model';
import { Request, Response, NextFunction } from 'express';

const increaseVisit = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const slug = req.params.slug;

  await postModel.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });

  next();
};

export default increaseVisit;
