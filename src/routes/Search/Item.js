import React from 'react';
import styles from './Item.less';

export default ({ title, cover, author, wordCount }) => (<div className={styles.item}>
  <img className={styles.cover} src={cover} alt="" />
  <h5>{title}</h5>
  <p>{author}</p>
  <p>{wordCount > 10000 ? `${parseInt(wordCount / 10000, 0)}万` : wordCount}字</p>
</div>);
