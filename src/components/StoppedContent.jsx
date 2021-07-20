import React from 'react';
import PropTypes from 'prop-types';
import { Score, TimeCount, StartButton, DifficultyPicker, SetSizePicker } from './';

function StoppedContent(props) {
  const report = (props.totalCount >= 0) &&
    (<div>
      <Score correctCount={props.correctCount} totalCount={props.totalCount} />
      <TimeCount startTime={props.startTime} endTime={props.endTime} />
      <div className="wrong-answers">
        {
          props.wrongAnswers.map((wrongAnswer) => {
            return (
              <div className="wrong-answer" key={props.wrongAnswers.indexOf(wrongAnswer)}>
                {wrongAnswer}
              </div>
            );
          })
        }
      </div>
      <hr/>
    </div>);
  return (
    <div>
      {report}
      <StartButton handleClick={props.handleStart} />
      <DifficultyPicker
        activeDifficulty={props.activeDifficulty}
        handleClick={props.handleDifficultySelect}
      />
      <SetSizePicker
        activeSetSize={props.activeSetSize}
        handleClick={props.handleSetSizeSelect}
      />
    </div>
  );
}

StoppedContent.propTypes = {
  correctCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleDifficultySelect: PropTypes.func.isRequired,
  activeDifficulty: PropTypes.number.isRequired,
  handleSetSizeSelect: PropTypes.func.isRequired,
  activeSetSize: PropTypes.number.isRequired,
};

export default StoppedContent;
