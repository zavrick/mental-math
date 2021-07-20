import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import { Question, DifficultyPicker, SetSizePicker } from './components';

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


class App extends Component {
  constructor() {
    super();

    this.state = {
      hasStarted: false,
      correctCount: 0,
      questionNumber: 0, // use this to infer totalCount
      startTime: 0,
      endTime: 0,
      difficulty: 2,
      setSize: 20,
      wrongAnswers: [],
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleDifficultySelect = this.handleDifficultySelect.bind(this);
    this.handleSetSizeSelect = this.handleSetSizeSelect.bind(this);
  }

  handleStart() {
    this.setState({
      hasStarted: true,
      correctCount: 0,
      startTime: Date.now(),
      questionNumber: 1,
    });
  }

  handleStop() {
    this.setState({
      hasStarted: false,
      endTime: Date.now(),
    });
  }

  handleAnswer(isCorrect, question, inputAnswer, correctAnswer) {
    const setSize = this.state.setSize;
    const questionNumber = this.state.questionNumber;
    let wrongAnswers = this.state.wrongAnswers;

    this.setState(prevState => ({ questionNumber: prevState.questionNumber + 1 }));
    if (isCorrect) {
      this.setState(prevState =>
        ({ correctCount: prevState.correctCount + 1 }),
      );
    } else {
      const wrongQuestionAnswer = `${question} = ${inputAnswer || "__"} (${correctAnswer})`;
      this.setState({ wrongAnswers: wrongAnswers.concat(wrongQuestionAnswer) });
    }
    if (questionNumber >= setSize) this.handleStop();
  }

  handleDifficultySelect(difficulty) {
    this.setState({ difficulty });
  }

  handleSetSizeSelect(setSize) {
    this.setState({ setSize });
  }

  render() {
    const hasStarted = this.state.hasStarted;
    const difficulty = this.state.difficulty;
    const setSize = this.state.setSize;
    const correctCount = this.state.correctCount;
    const questionNumber = this.state.questionNumber;
    const content = hasStarted ?
      (<StartedContent
        difficulty={difficulty}
        questionNumber={questionNumber}
        handleAnswer={this.handleAnswer}
      />) :
      (<StoppedContent
        correctCount={correctCount}
        totalCount={questionNumber - 1}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        handleStart={this.handleStart}
        handleDifficultySelect={this.handleDifficultySelect}
        activeDifficulty={difficulty}
        handleSetSizeSelect={this.handleSetSizeSelect}
        activeSetSize={setSize}
        wrongAnswers={this.state.wrongAnswers}
      />);

    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/intute/web-assets/Logos/Intute-Logo-100.png" className="App-logo" alt="logo" />
          <h2>Welcome to Quick Math</h2>
          {this.state.hasStarted && <StopButton handleClick={this.handleStop} className="stop" />}
        </div>
        <div className="content-container">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
