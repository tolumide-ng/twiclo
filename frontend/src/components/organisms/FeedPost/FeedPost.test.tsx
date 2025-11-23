import { render, screen } from '@testing-library/react';
import { FeedPost } from './FeedPost';
import { formatDistanceToNow } from 'date-fns';
import { MemoryRouter } from 'react-router';
import { PostWithAuthor } from '../../../types/post';

describe('FeedPost component', () => {
  const mockPost = {
    post: 'Hello world!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    repliesCount: 3,
    rtsCount: 5,
    id: 'whatever',
    author: {
      username: 'johndoe',
      displayName: 'John Doe',
      avatar: '/avatar.png',
    },
  } as unknown as PostWithAuthor;

  const setup = () => {
    render(
      <MemoryRouter>
        <FeedPost {...mockPost} />
      </MemoryRouter>,
    );
  };

  it('renders author info correctly', () => {
    setup();
    const displayName = screen.getByText(mockPost.author.displayName);
    const username = screen.getByText(`@${mockPost.author.username}`);
    const avatar = screen.getByAltText(`avi of ${mockPost.author.username}`);

    expect(displayName).toBeVisible();
    expect(username).toBeVisible();
    expect(avatar).toHaveAttribute('src', mockPost.author.avatar);
  });

  it('renders post content', () => {
    setup();
    expect(screen.getByText(mockPost.post)).toBeInTheDocument();
  });

  it('renders retweet and reply counts', () => {
    setup();
    expect(
      screen.getByText(`Retweets (${mockPost.rtsCount})`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Replies (${mockPost.repliesCount})`),
    ).toBeInTheDocument();
  });

  it('renders formatted timestamp', () => {
    setup();
    const formattedTime = formatDistanceToNow(mockPost.timestamp, {
      addSuffix: true,
    });
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });
});
