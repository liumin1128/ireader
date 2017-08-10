import React from 'react';

export default ({ children, onPress, onTap }) => {
  let timeout;
  let pressed = false;
  function touchStart() {
    timeout = setTimeout(() => {
      pressed = true;
      if (onPress) onPress();
    }, 500);
    return false;
  }
  function touchEnd() {
    if (pressed) {
      pressed = false;
    } else {
      clearTimeout(timeout);
      if (onTap) onTap();
    }
    return false;
  }
  return (<div onTouchStart={touchStart} onTouchEnd={touchEnd}>
    { children }
  </div>);
};
