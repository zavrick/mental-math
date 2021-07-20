import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

function StartedContent(props) {
  return (
    <Question
      difficulty={props.difficulty}
      handleAnswer={props.handleAnswer}
      questionNumber={props.questionNumber}
    />
  );
}

StartedContent.propTypes = {
  difficulty: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default StartedContent;
