export type Comment = {
  _id?: string;
  user: {
    username: string;
    img: string;
  };
  desc: string;
  createdAt: Date | string;
};
