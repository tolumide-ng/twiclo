import { useContext, useEffect } from 'react';
import { PostsContext } from '../../../store/posts/context';
import { Status } from '../../../types/status';
import { FeedPost } from '../../organisms/FeedPost/FeedPost';
import styles from './HomeFeed.module.css';
import { CreatePost } from '../../organisms/CreatePost/CreatePost';

export const HomeFeed = () => {
  const { fetchFeed, createPost, state } = useContext(PostsContext);

  useEffect(() => {
    if (state.status === Status.Rest) {
      fetchFeed();
    }
  }, [fetchFeed, state]);

  const onSubmit = (post: string) => {
    createPost(post);
  };

  return (
    <article className={styles.feed}>
      <div className={styles.feedCreate}>
        <CreatePost
          onSubmit={onSubmit}
          disabled={state.status === Status.Loading}
        />
      </div>
      <ul className={styles.feedUl}>
        {state.feed?.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </ul>
    </article>
  );
};
