import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Not Found</h1>
      <p className={styles.message}>
        The resource you are looking for does not exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};
