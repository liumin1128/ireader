import React from 'react';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { goBack } from '../../utils/common.js';

function Back() {
  return (
    <IconButton onClick={goBack}>
      <LeftIcon color="#fff" />
    </IconButton>
  );
}

export default Back;
