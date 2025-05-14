import Post from '@/models/post.model';
import { Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const createPost = async (req: Request, res: Response) => {
  const post = new Post(req.body);
  await post.save();
  res.status(200).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id });
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
  }
  res.status(200).json({ message: 'Post deleted successfully' });
};
