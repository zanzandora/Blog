export type Post = {
  _id?: string;
  title: string;
  desc: string;
  content: string;
  user: {
    username: string;
    img: string;
  };
  category: string;
  isFeature?: boolean;
  createdAt: Date | string;
  img: string;
  slug: string;
};
