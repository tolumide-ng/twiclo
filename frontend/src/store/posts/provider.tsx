import { useCallback, useMemo, useState } from 'react';
import { PostsContext, type PostsState } from './context';
import { Status } from '../../types/status';
import { apiCall } from '../../utils/apiCall';

export const PostsProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<PostsState>({
    feed: [],
    status: Status.Rest,
    error: null,
  });

  const fetchFeed = useCallback(async (postId?: string) => {
    setState({ feed: [], status: Status.Loading, error: null });

    try {
      const params: Record<string, string> = {};
      if (postId) {
        params['postId'] = postId;
      }

      const { data: feed } = await apiCall<PostsState['feed']>({
        method: 'GET',
        path: 'feed',
        params,
      });

      setState({ feed, status: Status.Success, error: null });
    } catch (err) {
      setState({
        feed: [],
        error: (err as Error)?.message || 'error',
        status: Status.Error,
      });
    }
  }, []);

  const createPost = useCallback(async (post: string, replyId?: string) => {
    try {
      setState((prev) => ({ ...prev, status: Status.Loading, error: null }));

      // rather than implementing SSE on the BE for getting the updated posts, we'd manually update the list here for now
      const { data: newPost } = await apiCall<PostsState['feed'][number]>({
        method: 'POST',
        path: 'feed',
        data: { replyId, post },
      });

      setState((prev) => ({
        ...prev,
        status: Status.Success,
        feed: [newPost, ...prev.feed],
      }));
    } catch (err) {
      setState({
        status: Status.Error,
        feed: [],
        error: (err as Error)?.message || 'error',
      });
    }
  }, []);

  const valueProps = useMemo(
    () => ({ state, fetchFeed, createPost }),
    [state, fetchFeed, createPost],
  );
  return (
    <PostsContext.Provider value={valueProps}>{children}</PostsContext.Provider>
  );
};
