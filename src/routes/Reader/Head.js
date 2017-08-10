import React, { Component } from 'react';
import Headroom from 'react-headroom';
import styles from './Head.less';
import CloseIcon from './close.svg';
// import MenuIcon from './menu.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.back = () => {
      this.props.history.push('/');
      window.scrollTo(0, 0);
    };
  }
  render() {
    const { bookName, title, color = {} } = this.props;
    return (
      <Headroom >
        <div className={styles.head} style={color}>
          <div className={styles.info}>
            <h3>{bookName}</h3>
            <p>{title}</p>
          </div>
          <div className={styles.menus}>
            <span className={styles.button} onClick={this.back}>
              <img style={{ opacity: 0.5 }} src={CloseIcon} alt="" />
            </span>
          </div>
        </div>
      </Headroom>
    );
  }
}

export default Header;
