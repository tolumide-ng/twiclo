export type Profile = {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  id: string;
  avatar: string;
};

export type FollowData = {
  followers: number;
  following: number;
  id: string;
  userid: string;
};

export type ProfileData = Profile & { follows: FollowData };
