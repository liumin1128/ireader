import React from 'react';
import styles from './Item.less';

export default ({ title, cover, author, wordCount, shortIntro = '', latelyFollower }) => (<div className={styles.item}>
  <img className={styles.cover} src={cover} alt="" />
  <h5>{title}</h5>
  <p className={styles.author}>{author}</p>
  <p className={styles.meta}>{wordCount > 10000 ? `${parseInt(wordCount / 10000, 0)} 万` : wordCount}字、{latelyFollower} 人在追</p>
  <p>{shortIntro.length > 40 ? `${shortIntro.substring(0, 40)}...` : shortIntro}</p>
</div>);
