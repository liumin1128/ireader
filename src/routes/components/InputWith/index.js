import React, { Component } from 'react';
import styles from './index.less';

class InputWith extends Component {
  constructor(props) {
    super(props);
    this.search = () => {
      this.props.onAction(this.input.value);
    };
  }
  render() {
    return (<div className={styles.inputWith}>
      <input type="text" ref={(c) => { this.input = c; }} />
      <button onClick={this.search}>搜索</button>
    </div>);
  }
}

export default InputWith;
