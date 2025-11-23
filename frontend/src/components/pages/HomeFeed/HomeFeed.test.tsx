import { render, screen } from '@testing-library/react';
import { HomeFeed } from './HomeFeed';
import { PostsContext, type PostsState } from '../../../store/posts/context';
import { Status } from '../../../types/status';
import type { PostWithAuthor } from '../../../types/post';
import type { Profile, ProfileData } from '../../../types/profile';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

const mockProfile = {
  username: 'johndoe',
  displayName: 'John Doe',
  avatar: '/avatar.png',
  bio: 'Test bio',
  location: 'NY',
  follows: { following: 10, followers: 5 },
} as ProfileData;

const mockFeed = [
  {
    id: '1',
    post: 'Hello world!',
    timestamp: new Date().toISOString(),
    author: mockProfile as Profile,
    repliesCount: 2,
    rtsCount: 3,
  },
  {
    id: '2',
    post: 'Another post',
    timestamp: new Date().toISOString(),
    author: mockProfile,
    repliesCount: 0,
    rtsCount: 1,
  },
] as PostWithAuthor[];

describe('HomeFeed', () => {
  const fetchFeed = jest.fn();
  const createPost = jest.fn();

  const renderComponent = (stateOverride?: Partial<PostsState>) =>
    render(
      <PostsContext.Provider
        value={{
          state: {
            status: Status.Rest,
            feed: mockFeed,
            ...stateOverride,
          } as PostsState,
          fetchFeed,
          createPost,
        }}
      >
        <MemoryRouter>
          <HomeFeed />
        </MemoryRouter>
      </PostsContext.Provider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchFeed on mount if status is Rest', () => {
    renderComponent({ status: Status.Rest });
    expect(fetchFeed).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchFeed on mount if status is Loading', () => {
    renderComponent({ status: Status.Loading });
    expect(fetchFeed).not.toHaveBeenCalled();
  });

  it('renders CreatePost and passes disabled prop when loading', () => {
    renderComponent({ status: Status.Loading });

    const button = screen.getByRole('button', { name: /post/i });
    expect(button).toBeDisabled();
  });

  it('submits a new post via CreatePost', async () => {
    renderComponent();
    const user = userEvent.setup();

    const textarea = screen.getByPlaceholderText("What's happening?");
    const button = screen.getByRole('button', { name: /post/i });

    await user.type(textarea, 'New post content');
    await user.click(button);

    expect(createPost).toHaveBeenCalledWith('New post content');
  });
  it('renders FeedPost components for each post in feed', () => {
    renderComponent();

    mockFeed.forEach((post) => {
      expect(screen.getByText(post.post)).toBeInTheDocument();
      expect(
        screen.getByText(`Replies (${post.repliesCount})`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Retweets (${post.rtsCount})`),
      ).toBeInTheDocument();
    });
  });
});
