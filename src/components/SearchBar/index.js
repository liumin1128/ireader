// @flow

import React, { Component } from 'react';
import styles from './style.less';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = (e) => {
      const value = this.input.value;
      if (value) {
        if (this.props.onSubmit) this.props.onSubmit(value);
      }
      e.preventDefault();
    };
    this.cancel = () => {
      this.props.history.goBack();
    };
    this.onChange = () => {
      if (this.props.onChange) this.props.onChange(this.input.value);
    };
  }
  render() {
    const { type } = this.props;
    return (
      <form className={styles.search} action="" onSubmit={this.onSubmit}>
        <div className={styles.box}>
          <div className={styles.input}>
            <img className={styles.icon} src="http://7xiy7w.com1.z0.glb.clouddn.com/search%20%282%29.svg" alt="" />
            <input type={type || 'search'} onChange={this.onChange} ref={(c) => { this.input = c; }} id="text" placeholder="输入关键字搜索" />
          </div>
          <span className={styles.cancel} onClick={this.cancel}>取消</span>
        </div>
      </form>
    );
  }
}

export default SearchBar;
