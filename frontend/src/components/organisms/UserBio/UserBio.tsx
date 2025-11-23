import type { ProfileData } from '../../../types/profile';
import styles from './UserBio.module.css';

type Props = ProfileData;

export const UserBio = ({
  username,
  displayName,
  bio,
  avatar,
  location,
  follows,
}: Props) => {
  return (
    <div className={styles.bio}>
      <div className={styles.bioAvi}>
        <img src={avatar} alt={`${displayName}`} className={styles.bioAviImg} />
      </div>

      <div className={styles.bioData}>
        <div className={styles.bioAviName}>
          <p className={styles.bioAviDisplayname}>{displayName}</p>
          <p className={styles.bioAviUsername}>@{username}</p>
        </div>

        <div className={styles.bioMeta}>
          <p className={styles.bioMetaBio}>{bio}</p>
          <div className={styles.bioMetaData}>
            <p className={styles.bioMetaDataKey}>Location: </p>
            <p className={styles.bioMetaDataValue}>{location}</p>
          </div>
        </div>

        <div className={styles.bioMetaFollows}>
          <div className={styles.bioMetaData}>
            <p className={styles.bioMetaDataValue}>{follows.following}</p>
            <p className={styles.bioMetaDataKey}>following</p>
          </div>
          <div className={styles.bioMetaData}>
            <p className={styles.bioMetaDataValue}>{follows.followers}</p>
            <p className={styles.bioMetaDataKey}>follower(s)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
