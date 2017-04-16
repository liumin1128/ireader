import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from './Reader.less';

function Reader({ chapter, loading, status, theme }) {
  return (
    <div style={{ ...theme }}>

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
          <div className={styles.title} style={{ background: theme.background }}>
            <span>{chapter.title}</span>
          </div>
          {chapter.isVip && <p style={{ margin: 0, textAlign: 'center' }}><br /><br /><br /><br /><br /><br />当前章节Vip专属，请换源重试！<br /><br />安装最新版追书神器，支持正版！<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>}
          {chapter.body && !chapter.isVip && chapter.body.split('\n').map((i, index) =>
            <p key={index}>{i}</p>,
          )}
        </div>
      }

    </div>
  );
}

export default Reader;
