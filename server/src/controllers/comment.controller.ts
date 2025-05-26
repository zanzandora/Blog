import commentModel from '@/models/comment.model';
import userModel from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';

export const getComment = async (req: Request, res: Response) => {
  const comment = await commentModel
    .find({ post: req.params.postId })
    .populate([{ path: 'user', select: 'username img' }])
    .sort({ createdAt: -1 });
  res.status(200).json(comment);
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    // console.log('Headers:', req.headers);
    // console.log('clerkUserId:', clerkUserId);

    if (!clerkUserId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const comment = new commentModel({
      user: user._id,
      post: req.params.postId,
      ...req.body,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    // console.log('Headers:', req.headers.authorization);

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    type SessionClaims = { metadata?: { role?: string } };
    const sessionClaims = req.auth.sessionClaims as SessionClaims | undefined;
    const role = sessionClaims?.metadata?.role || 'user';

    if (role === 'admin') {
      await commentModel.findOneAndDelete({
        _id: req.params.id,
      });
      return res.status(200).json({ message: 'Comment deleted successfully' });
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const comment = await commentModel.findOneAndDelete({
      _id: req.params.id,
      user: user?._id,
    });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
