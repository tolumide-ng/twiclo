import { render, screen } from '@testing-library/react';
import { UserBio } from './UserBio';
import { ProfileData } from '../../../types/profile';

describe('UserBio component', () => {
  const mockProfile = {
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Just a test user',
    avatar: '/avatar.png',
    location: 'New York',
    follows: {
      following: 10,
      followers: 5,
    },
  } as unknown as ProfileData;

  const setup = () => {
    render(<UserBio {...mockProfile} />);
  };

  it('renders avatar with correct src and alt', () => {
    setup();
    const avatarImg = screen.getByAltText(mockProfile.displayName);
    expect(avatarImg).toBeInTheDocument();
    expect((avatarImg as HTMLImageElement).src).toContain(mockProfile.avatar);
  });

  it('renders display name and username', () => {
    setup();
    expect(screen.getByText(mockProfile.displayName)).toBeInTheDocument();
    expect(screen.getByText(`@${mockProfile.username}`)).toBeInTheDocument();
  });

  it('renders bio text', () => {
    setup();
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
  });

  it('renders location', () => {
    setup();
    expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
  });

  it('renders following and follower counts', () => {
    setup();

    expect(
      screen.getByText(mockProfile.follows.following.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProfile.follows.followers.toString()),
    ).toBeInTheDocument();
    expect(screen.getByText('following')).toBeInTheDocument();
    expect(screen.getByText('follower(s)')).toBeInTheDocument();
  });
});
