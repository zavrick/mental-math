import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Question from './components';

function StartButton(props) {
  return (
    <button className="btn btn-primary" onClick={props.handleClick}>
      Start
    </button>
  );
}

StartButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

function StopButton(props) {
  return (
    <button className="btn" onClick={props.handleClick}>
      Stop
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
      Time taken: {time.trim()}.
    </div>
  );
}

TimeCount.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

function StoppedContent(props) {
  const score = props.endTime - props.startTime > 0 &&
    <Score correctCount={props.correctCount} totalCount={props.totalCount} />;
  return (
    <div>
      {score}
      {props.endTime - props.startTime > 0 ?
        <TimeCount startTime={props.startTime} endTime={props.endTime} /> :
        null}
      <StartButton handleClick={props.handleStart} />
    </div>
  );
}

StoppedContent.propTypes = {
  correctCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
};

function StartedContent(props) {
  return (
    <Question handleAnswer={props.handleAnswer} questionNumber={props.questionNumber} />
  );
}

StartedContent.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};


class App extends Component {
  constructor() {
    super();

    this.state = {
      isStarted: false,
      correctCount: 0,
      questionNumber: null, // use this to infer totalCount
      startTime: 0,
      endTime: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleStart() {
    this.setState({
      isStarted: true,
      correctCount: 0,
      startTime: Date.now(),
      questionNumber: 1,
    });
  }

  handleStop() {
    this.setState({
      isStarted: false,
      endTime: Date.now(),
    });
  }

  handleAnswer(isCorrect) {
    this.setState(prevState => ({ questionNumber: prevState.questionNumber + 1 }));
    if (isCorrect) {
      this.setState(prevState =>
        ({ correctCount: prevState.correctCount + 1 }),
      );
    }
  }

  render() {
    const correctCount = this.state.correctCount;
    const questionNumber = this.state.questionNumber;
    const content = this.state.isStarted ?
      (<StartedContent
        questionNumber={questionNumber}
        handleAnswer={this.handleAnswer}
      />) :
      (<StoppedContent
        correctCount={correctCount}
        totalCount={questionNumber - 1}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        handleStart={this.handleStart}
      />);

    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/intute/web-assets/Logos/Intute-Logo-100.png" className="App-logo" alt="logo" />
          <h2>Welcome to Intute Mental Math</h2>
          {this.state.isStarted && <StopButton handleClick={this.handleStop} className="stop" />}
        </div>
        <div className="content-container">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
