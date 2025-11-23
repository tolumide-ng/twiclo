import { useContext, useEffect } from 'react';
import { PostsContext } from '../../../store/posts/context';
import { Status } from '../../../types/status';
import { FeedPost } from '../../organisms/FeedPost/FeedPost';
import styles from './HomeFeed.module.css';

export const HomeFeed = () => {
  const { fetchFeed, state } = useContext(PostsContext);

  useEffect(() => {
    if (state.status === Status.Rest) {
      fetchFeed();
    }
  }, [fetchFeed, state]);

  return (
    <article className={styles.feed}>
      <ul className={styles.feedUl}>
        {state.feed?.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </ul>
    </article>
  );
};
