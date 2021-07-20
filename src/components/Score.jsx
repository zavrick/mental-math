import React from 'react';
import PropTypes from 'prop-types';

function Score({ correctCount, totalCount }) {
  return (
    <div className="score">
      You got {correctCount} out of {totalCount} correct!
    </div>
  );
}

Score.propTypes = {
  correctCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Score;
