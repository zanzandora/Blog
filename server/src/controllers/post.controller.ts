import commentModel from '@/models/comment.model';
import postModal from '@/models/post.model';
import userModel from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';
import ImageKit from 'imagekit';
import { SortOrder } from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1');
  const limit = parseInt((req.query.limit as string) || '2');

  const query: Record<string, any> = {};

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.feature;

  if (cat && cat !== 'general') {
    query.category = cat;
  }

  if (searchQuery) {
    query.$text = { $search: searchQuery };
  }

  if (author) {
    const user = await userModel.findOne({ username: author }).select('_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    query.user = user._id;
  }
  let sortObj: { [key: string]: SortOrder } = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'most-popular':
        sortObj = { visit: -1 };
        break;
      case 'trending':
        sortObj = { visit: -1 };
        (query as any).createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeature = true;
  }

  const posts = await postModal
    .find(query)
    .populate('user', 'username')
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await postModal.countDocuments();
  const hasMore = page * limit < total;

  res.status(200).json({ posts, hasMore, page });
};

export const uploadAuth = async (req: Request, res: Response) => {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  });

  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await postModal
    .findOne({ slug: req.params.slug })
    .populate('user', 'username img');
  res.status(200).json(post);
};

export const featurePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    if (role !== 'admin') {
      return res.status(403).json({ message: 'You cannot feature posts !' });
    }

    const post = await postModal.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatePost = await postModal.findByIdAndUpdate(
      postId,
      {
        isFeature: !post.isFeature,
      },
      { new: true }
    );

    setTimeout(() => {
      res.status(200).json(updatePost);
    }, 1000);
  } catch (error) {
    next(error);
  }
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

    let slug = req.body.title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-') // thay thế khoảng trắng và ký tự đặc biệt bằng dấu -
      .replace(/^-+|-+$/g, '');

    let counter = 1;

    // Kiểm tra trùng lặp slug trong database
    while (await postModal.exists({ slug })) {
      slug = `${slug}-${counter}`;
      counter++;
    }

    const post = new postModal({ user: user._id, slug, ...req.body });
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

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    if (role === 'admin') {
      await postModal.findOneAndDelete({
        _id: req.params.id,
      });
      res.status(200).json({ message: 'Post deleted successfully' });
    }

    const user = await userModel.findOne({ clerkUserId });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const post = await postModal.findOneAndDelete({
      _id: req.params.id,
      user: user?._id,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await commentModel.deleteMany({ post: req.params.id });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
