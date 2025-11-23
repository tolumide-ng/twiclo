import React from 'react';
import type { Post } from '../../types/post';
import type { Status } from '../../types/status';
import type { Profile } from '../../types/profile';

export type PostsState = {
  status: Status;
  feed: (Post & { author: Profile })[];
  error: string | null;
  activePostId?: string;
};

export type StorePosts = {
  state: PostsState;
  fetchFeed: (id?: string) => Promise<void>;
  createPost: (post: string, replyId?: string) => Promise<void>;
};

export const PostsContext = React.createContext<StorePosts>({} as StorePosts);
