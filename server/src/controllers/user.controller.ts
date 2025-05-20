import commentModel from '@/models/comment.model';
import userModel from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';

export const getUserSavedPosts = async (req: Request, res: Response) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const user = await userModel.findOne({ clerkUserId });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user.savePosts);
};

export const savePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isSaved = user.savePosts.some((p) => p.toString() === postId);

    if (!isSaved) {
      await userModel.findByIdAndUpdate(
        user._id,
        {
          $push: { savePosts: postId },
        },
        { new: true }
      );
    } else {
      await userModel.findByIdAndUpdate(
        user._id,
        {
          $pull: { savePosts: postId },
        },
        { new: true }
      );
    }
    setTimeout(() => {
      res.status(201).json(isSaved ? 'Post unsaved' : 'Post saved');
    }, 3000);
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
