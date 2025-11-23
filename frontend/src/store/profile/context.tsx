import React from 'react';
import type { Status } from '../../types/status';
import type { PostWithAuthor } from '../../types/post';
import type { ProfileData } from '../../types/profile';

export type ProfileState = {
  profile: {
    status: Status;
    error: string | null;
    data: ProfileData | null;
  };
  posts: {
    status: Status;
    error: string | null;
    data: PostWithAuthor[];
  };
};

export type StoreProfile = {
  fetchProfile: (_id: string) => Promise<void>;
  state: ProfileState;
};

export const ProfileContext = React.createContext<StoreProfile>({
  fetchProfile: () => {},
  state: {},
} as unknown as StoreProfile);
