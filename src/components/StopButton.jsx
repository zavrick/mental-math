import React from 'react';
import PropTypes from 'prop-types';

function StopButton(props) {
  return (
    <button className="StopButton Button" onClick={props.handleClick}>
      Emergency Stop!
    </button>
  );
}

StopButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default StopButton;
