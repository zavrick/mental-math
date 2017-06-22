import React from 'react';
import PropTypes from 'prop-types';
import '../css/DifficultyPicker.css';

function DifficultyInWords(difficulty) {
  switch (difficulty) {
    case 1:
      return 'Easy';
    case 2:
      return 'Normal';
    case 3:
      return 'Hard';
    default:
      return 'Mystery';
  }
}

function DifficultyButton(props) {
  const difficulty = DifficultyInWords(props.value);
  return (
    <button
      className={`${props.isActive ? 'DifficultyButton--active' : ''} DifficultyButton Button`}
      onClick={() => props.handleClick(props.value)}
    >
      {difficulty}
    </button>
  );
}

DifficultyButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function DifficultyPicker(props) {
  const difficulties = [1, 2, 3];
  const activeDifficulty = props.activeDifficulty;
  const buttons = difficulties.map(difficulty =>
    (<DifficultyButton
      isActive={activeDifficulty === difficulty}
      key={difficulty}
      value={difficulty}
      handleClick={props.handleClick}
    />),
  );

  return (
    <div className="DifficultyPicker">
      <p> You are on {DifficultyInWords(activeDifficulty)} difficulty.</p>
      {buttons}
    </div>
  );
}

DifficultyPicker.propTypes = {
  handleClick: PropTypes.func.isRequired,
  activeDifficulty: PropTypes.number.isRequired,
};

export default DifficultyPicker;
