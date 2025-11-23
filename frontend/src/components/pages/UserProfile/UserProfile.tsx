import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProfileContext } from '../../../store/profile/context';
import { UserBio } from '../../organisms/UserBio/UserBio';
import { FeedPost } from '../../organisms/FeedPost/FeedPost';
import styles from './UserProfile.module.css';

export const UserProfile = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();

  const { state, fetchProfile } = useContext(ProfileContext);

  useEffect(() => {
    if (userName) {
      fetchProfile(userName);
    }
  }, [fetchProfile, userName]);

  const handleGoBack = () => {
    const referrer = document.referrer;
    const isInternal = referrer?.includes?.(globalThis?.location.host);

    if (isInternal && globalThis.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <article>
      <button className={styles.userBackButton} onClick={handleGoBack}>
        &larr;
      </button>
      <div className={styles.userBio}>
        {state.profile.data ? <UserBio {...state.profile.data} /> : null}
      </div>
      <ul className={styles.userUl}>
        {state.posts.data?.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </ul>
    </article>
  );
};
