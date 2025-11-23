import React from 'react';
import type { Status } from '../../types/status';
import type { Post } from '../../types/post';
import type { Profile, ProfileData } from '../../types/profile';

export type ProfileState = {
  profile: {
    status: Status;
    error: string | null;
    data: ProfileData | null;
  };
  posts: {
    status: Status;
    error: string | null;
    data: (Post & { author: Profile })[];
  };
};

export type StoreProfile = {
  fetchProfile: (_id: string) => Promise<void>;
  state: ProfileState;
};

export const ProfileContext = React.createContext<StoreProfile>(
  {} as StoreProfile,
);
