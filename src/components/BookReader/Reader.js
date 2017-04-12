import React from 'react';
import styles from './Reader.js.css';

function Reader({ dispatch, chapter, loading }) {
  return (
    <div className={styles.normal}>
      {chapter.title}
      {chapter.body}
    </div>
  );
}

export default Reader;
