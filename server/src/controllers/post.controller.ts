import Post from '@/models/post.model';
import userModel from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    console.log('Headers:', req.headers);
    console.log('clerkUserId:', clerkUserId);

    if (!clerkUserId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const post = new Post({ user: user._id, ...req.body });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    console.log('Headers:', req.headers.authorization);

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user?._id,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
