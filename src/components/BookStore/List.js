import React from 'react';
import styles from './List.css';

function List({ list }) {
  return (
    <div className={styles.normal}>
      {list.map(i => <div>
        <h1>{i.title}</h1>
      </div>)}
    </div>
  );
}

export default List;
