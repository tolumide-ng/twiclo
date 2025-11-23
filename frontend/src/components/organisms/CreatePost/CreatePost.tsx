import { useState } from 'react';
import styles from './CreatePost.module.css';

type Props = {
  onSubmit: (post: string) => void;
  disabled: boolean;
};

const MAX_CHARS = 280;

export const CreatePost = ({ onSubmit, disabled }: Props) => {
  const [state, setState] = useState('');
  const tooLong = state.length > MAX_CHARS;
  const effectiveDisabled = disabled || tooLong || state.trim().length === 0;

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onSubmit(state);
    setState('');
  };

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.tweet}>
      <textarea
        value={state}
        placeholder="What's happening?"
        cols={100}
        rows={3}
        onChange={handleChange}
        className={styles.tweetText}
      ></textarea>

      <div className={styles.tweetFooter}>
        <span
          className={
            tooLong ? styles.tweetCharCountError : styles.tweetCharCount
          }
        >
          {state.length}/{MAX_CHARS}
        </span>

        <button
          className={styles.tweetButton}
          type="submit"
          disabled={effectiveDisabled}
        >
          Post
        </button>
      </div>
    </form>
  );
};
