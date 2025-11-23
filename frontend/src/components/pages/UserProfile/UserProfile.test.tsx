import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';
import {
  ProfileContext,
  type StoreProfile,
} from '../../../store/profile/context';
import { MemoryRouter } from 'react-router';
import { Status } from '../../../types/status';
import { ProfileData } from '../../../types/profile';
import { PostWithAuthor } from '../../../types/post';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ userName: 'johndoe' }),
}));

describe('UserProfile component', () => {
  const mockProfileData = {
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Test bio',
    avatar: '/avatar.png',
    location: 'NY',
    follows: { following: 10, followers: 5 },
  } as ProfileData;

  const mockPosts = [
    {
      id: '1',
      post: 'Hello world!',
      timestamp: new Date().toISOString(),
      author: mockProfileData,
      repliesCount: 2,
      rtsCount: 3,
    } as unknown as PostWithAuthor,
  ];

  const fetchProfile = jest.fn();

  const contextValue: StoreProfile = {
    state: {
      profile: { data: mockProfileData, status: Status.Rest, error: null },
      posts: { data: mockPosts, status: Status.Rest, error: null },
    },
    fetchProfile,
  };

  const setup = () =>
    render(
      <ProfileContext.Provider value={contextValue}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </ProfileContext.Provider>,
    );

  it('calls fetchProfile on mount', () => {
    setup();
    expect(fetchProfile).toHaveBeenCalledWith('johndoe');
  });

  it('renders FeedPost for each post', () => {
    setup();
    const post = mockPosts[0];
    expect(screen.getByText(post.post)).toBeInTheDocument();
    expect(
      screen.getByText(`Replies (${post.repliesCount})`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Retweets (${post.rtsCount})`)).toBeInTheDocument();
  });
});
