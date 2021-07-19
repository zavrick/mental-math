import React from 'react';
import PropTypes from 'prop-types';
import '../css/SetSizePicker.css';

function SetSizeButton(props) {
  return (
    <button
      className={`${props.isActive ? 'SetSizeButton--active' : ''} SetSizeButton Button`}
      onClick={() => props.handleClick(props.value)}
    >
      {props.value}
    </button>
  );
}

SetSizeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function SetSizePicker(props) {
  const activeSetSize = props.activeSetSize;
  const setSizes = [10, 20, 40];
  const buttons = setSizes.map(setSize =>
    (<SetSizeButton
      isActive={activeSetSize === setSize}
      key={setSize}
      value={setSize}
      handleClick={props.handleClick}
    />),
  );

  return (
    <div className="DifficultyPicker">
      <p> You will be doing <b>{activeSetSize}</b> questions.</p>
      {buttons}
    </div>
  );
}

SetSizePicker.propTypes = {
  handleClick: PropTypes.func.isRequired,
  activeSetSize: PropTypes.number.isRequired,
};

export default SetSizePicker;
