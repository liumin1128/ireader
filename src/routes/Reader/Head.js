import React, { Component } from 'react';
import Headroom from 'react-headroom';

import styles from './Head.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'black',
    };
    this.back = () => {
      history.goBack();
    };
  }
  render() {
    return (
      <Headroom
        onUnpin={() => {
          this.setState({
            theme: 'white',
          });
        }}
        onUnfix={() => {
          this.setState({
            theme: 'black',
          });
        }}
      >
        <div className={styles.head}>
          <span />
          <span className={styles.button}><img style={{ opacity: 0.5 }} src="http://ooi7vpwhj.bkt.clouddn.com/close.svg" alt="" /></span>
        </div>
      </Headroom>
    );
  }
}

export default Header;
