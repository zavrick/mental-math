import React from 'react';
import PropTypes from 'prop-types';

function StartButton(props) {
  return (
    <button className="StartButton Button" onClick={props.handleClick}>
      Start
    </button>
  );
}

StartButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default StartButton;
