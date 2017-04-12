import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from './Reader.less';

function Reader({ dispatch, chapter, loading }) {
  return (
    <div className={styles.normal}>

      {
        loading
        ? <RefreshIndicator
          size={50}
          left={70}
          top={0}
          loadingColor="#FF9800"
          status="loading"
        />
        : <div className={styles.body}>
          <div className={styles.title}>{chapter.title}</div>
          {chapter.body && chapter.body.split('\n').map((i, index) =>
            <p key={index}>{i}</p>,
        )}
        </div>
      }

    </div>
  );
}

export default Reader;
