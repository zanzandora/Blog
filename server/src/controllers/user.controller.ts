import postModel from '@/models/post.model';
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
    }, 1000);
  } catch (error) {
    next(error);
  }
};

export const getSavedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '2');

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

    const savedPostIds = user.savePosts;

    const savedPosts = await postModel
      .find({ _id: { $in: savedPostIds } })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({ posts: savedPosts });
  } catch (error) {
    next(error);
  }
};
