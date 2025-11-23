import React from 'react';
import type { PostWithAuthor } from '../../types/post';
import type { Status } from '../../types/status';

export type PostsState = {
  status: Status;
  feed: PostWithAuthor[];
  error: string | null;
  activePostId?: string;
};

export type StorePosts = {
  state: PostsState;
  fetchFeed: (id?: string) => Promise<void>;
  createPost: (post: string, replyId?: string) => Promise<void>;
};

export const PostsContext = React.createContext<StorePosts>({} as StorePosts);
