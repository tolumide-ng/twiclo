import type { Post } from '../../types/post';
import type { Profile, ProfileData } from '../../types/profile';
import { Status } from '../../types/status';
import { apiCall } from '../../utils/apiCall';
import { ProfileContext, type ProfileState } from './context';
import React, { useCallback, useMemo, useState } from 'react';

export const ProfileProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<ProfileState>({
    profile: { data: null, status: Status.Rest, error: null },
    posts: { data: [], status: Status.Rest, error: null },
  });

  const fetchProfile = useCallback(async (userName: string) => {
    setState({
      profile: { status: Status.Loading, error: null, data: null },
      posts: { status: Status.Loading, error: null, data: [] },
    });

    const profile = apiCall<ProfileData>({
      path: `user/${userName}`,
      method: 'GET',
    });

    const profileFeed = apiCall<(Post & { author: Profile })[]>({
      path: `feed`,
      params: {
        userName,
      },
      method: 'GET',
    });

    const [profileResult, postsResult] = await Promise.allSettled([
      profile,
      profileFeed,
    ]);

    setState({
      profile:
        profileResult.status === 'fulfilled'
          ? {
              status: Status.Success,
              data: profileResult.value.data,
              error: null,
            }
          : {
              status: Status.Error,
              data: null,
              error: profileResult.reason,
            },

      posts:
        postsResult.status === 'fulfilled'
          ? {
              status: Status.Success,
              data: postsResult.value.data,
              error: null,
            }
          : {
              status: Status.Error,
              data: [],
              error: postsResult.reason,
            },
    });
  }, []);

  const valueProps = useMemo(
    () => ({ fetchProfile, state }),
    [fetchProfile, state],
  );

  return (
    <ProfileContext.Provider value={valueProps}>
      {children}
    </ProfileContext.Provider>
  );
};
