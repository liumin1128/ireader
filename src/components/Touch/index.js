import React from 'react';

export default ({ children, onPress, onTap }) => {
  let timeout;
  let pressed = false;
  let cancel = false;
  function touchStart() {
    timeout = setTimeout(() => {
      pressed = true;
      if (onPress) onPress();
    }, 500);
    return false;
  }
  function touchEnd() {
    clearTimeout(timeout);
    if (pressed) {
      pressed = false;
      return;
    }
    if (cancel) {
      cancel = false;
      return;
    }
    if (onTap) onTap();
    return false;
  }
  function touchCancel() {
    cancel = true;
  }
  return (<div
    onMouseDown={touchStart}
    onMouseUp={touchEnd}
    onTouchMove={touchCancel}
    onTouchCancel={touchCancel}
    onTouchStart={touchStart}
    onTouchEnd={touchEnd}
  >
    { children }
  </div>);
};
