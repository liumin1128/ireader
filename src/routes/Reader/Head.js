import React, { Component } from 'react';
import Headroom from 'react-headroom';
import styles from './Head.less';
import CloseIcon from './close.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.back = () => {
      this.props.history.push('/');
      window.scrollTo(0, 0);
    };
  }
  render() {
    return (
      <Headroom >
        <div className={styles.head}>
          <span />
          <span className={styles.button} onClick={this.back}>
            <img style={{ opacity: 0.5 }} src={CloseIcon} alt="" />
          </span>
        </div>
      </Headroom>
    );
  }
}

export default Header;
