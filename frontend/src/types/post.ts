import { Profile } from './profile';

export type Post = {
  id: string;
  author: string;
  post: string;
  timestamp: string;
  repliesCount: number;
  rtsCount: number;
};

export type PostWithAuthor = Post & { author: Profile };
