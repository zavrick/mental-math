import React from 'react';
import PropTypes from 'prop-types';

function TimeCount({ startTime, endTime }) {
  let timeTaken = Math.floor((endTime - startTime) / 1000);
  const seconds = Math.floor(timeTaken % 60);
  timeTaken /= 60;
  const minutes = Math.floor(timeTaken % 60);
  timeTaken /= 60;
  const hours = Math.floor(timeTaken % 24);
  const time = `${hours > 0 ? `${hours} ${hours > 1 ? 'hours' : 'hour'}` : ''}
    ${minutes > 0 ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}` : ''}
    ${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;

  return (
    <div className="score">
      Time taken: {time}
    </div>
  );
}

TimeCount.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default TimeCount;
