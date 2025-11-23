import { formatDistanceToNow } from 'date-fns';
import styles from './FeedPost.module.css';
import { Link } from 'react-router';
import type { Post } from '../../../types/post';
import type { Profile } from '../../../types/profile';

type Props = Post & {
  author: Profile;
};

export const FeedPost = ({
  author,
  post,
  timestamp,
  repliesCount,
  rtsCount,
}: Props) => {
  const handleStopProgation = (ev: React.MouseEvent) => {
    ev.stopPropagation();
  };

  return (
    <li className={styles.post}>
      <div className={styles.postLeft}>
        <Link
          to={`/${author.username}`}
          className={styles.postLeftLink}
          onClick={handleStopProgation}
        >
          <img
            className={styles.postLeftAvi}
            alt={`avi of ${author.username}`}
            src={author.avatar}
          />
        </Link>
      </div>
      <div className={styles.postRight}>
        <Link
          to={`/${author.username}`}
          className={styles.postRightTop}
          onClick={handleStopProgation}
        >
          <p className={styles.postDisplayName}>{author.displayName}</p>
          <p className={styles.postUsername}>@{author.username}</p>
          &middot;
          <p className={styles.postTime}>
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </p>
        </Link>
        <p className={styles.postContent}>{post}</p>

        <div className={styles.postActions}>
          <button className={styles.postAction}>
            Retweets ({rtsCount ?? 0})
          </button>
          <button className={styles.postAction}>
            Replies ({repliesCount ?? 0})
          </button>
        </div>
      </div>
    </li>
  );
};
