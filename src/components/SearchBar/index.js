// @flow

import React, { Component } from 'react';
import styles from './style.less';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      const value = this.input.value;
      if (value) {
        this.props.onSubmit(value);
        // this.input.value = '';
      }
      e.preventDefault();
    };
  }
  render() {
    return (
      <form action="" onSubmit={this.onSubmit}>
        <div className={styles.box}>
          <div className={styles.input}>
            <img className={styles.icon} src="http://7xiy7w.com1.z0.glb.clouddn.com/search%20%282%29.svg" alt="" />
            <input ref={(c) => { this.input = c; }} id="text" placeholder="输入关键字搜索" type="search" />
          </div>
          <span className={styles.cancel}>取消</span>
        </div>
      </form>
    );
  }
}

export default SearchBar;
