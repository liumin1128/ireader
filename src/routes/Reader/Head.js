import React, { Component } from 'react';
import Headroom from 'react-headroom';
import Ripples from 'react-ripples';
import styles from './Head.less';
import CloseIcon from './close.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'black',
    };
    this.back = () => {
      this.props.history.push('/');
      window.scrollTo(0, 0);
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
          <Ripples>
            <span className={styles.button} onClick={this.back}>
              <img style={{ opacity: 0.5 }} src={CloseIcon} alt="" />
            </span>
          </Ripples>
        </div>
      </Headroom>
    );
  }
}

export default Header;
