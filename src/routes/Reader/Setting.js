import React, { Component } from 'react';
import styles from './Setting.less';
import { COLORS, MODE_COLOR } from '../../utils/constants.js';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.open = () => {
      this.setState({
        visible: true,
      }, () => {
        document.addEventListener('click', this.close);
      });
    };
    this.close = () => {
      this.setState({
        visible: false,
      }, () => {
        document.removeEventListener('click', this.close);
      });
    };
    this.stopEvent = (e) => {
      // 阻止合成事件间的冒泡
      e.stopPropagation();
      // 阻止合成事件与最外层document上的事件间的冒泡
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault();
      return false;
    };
    this.setting = (key, val) => {
      this.props.dispatch({
        type: 'setting/save',
        payload: {
          [key]: val,
        },
      });
    };
    this.setMode = () => {
      const mode = this.props.mode === 'day' ? 'night' : 'day';
      const color = MODE_COLOR[mode];
      this.props.dispatch({
        type: 'setting/save',
        payload: {
          color,
          mode,
        },
      });
    };
    this.setStyle = (num) => {
      const fontSize = this.props.style.fontSize + num;
      this.props.dispatch({
        type: 'setting/save',
        payload: {
          style: {
            ...this.props.style,
            fontSize,
          },
        },
      });
    };
    this.clear = () => {
      this.props.dispatch({ type: 'setting/clear' });
    };
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.close);
  }
  render() {
    const { children, mode } = this.props;
    const { visible } = this.state;
    return (
      <div >
        <span onClick={this.open}>{children}</span>
        <div onClick={this.stopEvent} className={`${styles.setting} ${styles[visible ? 'show' : 'hide']}`}>
          <div className={styles.buttons}>
            <span onClick={this.setMode}>{mode === 'day' ? '黑夜' : '白天'}</span>
            <span onClick={this.setStyle.bind(this, 1)}>Aa+</span>
            <span onClick={this.setStyle.bind(this, -1)}>Aa-</span>
            <span onClick={this.clear}>默认</span>
          </div>
          <div className={styles.colors}>
            <div className={styles.colorsBox}>
              {
                COLORS.map(i => (<span
                  style={i}
                  onClick={this.setting.bind(this, 'color', i)}
                />))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
