import React from 'react';

export default ({ children, onPress, onTap }) => {
  let timeout;
  let pressed = false;
  function touchStart() {
    timeout = setTimeout(() => {
      pressed = true;
      onPress();
    }, 800);
  }
  function touchEnd() {
    if (pressed) {
      pressed = false;
    } else {
      clearTimeout(timeout);
      onTap();
    }
  }
  return (<div onTouchStart={touchStart} onTouchEnd={touchEnd}>
    { children }
  </div>);
};
