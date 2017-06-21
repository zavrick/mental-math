import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Question } from './components';

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

function Score({ correct, wrong }) {
  return (
    <div className="score">
      You got {correct} out of {correct + wrong} correct!
    </div>
  );
}

Score.propTypes = {
  correct: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
};

function TimeCount({ startTime, endTime }) {
  let timeTaken = (endTime - startTime) / 1000;
  const seconds = timeTaken % 60;
  timeTaken /= 60;
  const minutes = timeTaken % 60;
  timeTaken /= 60;
  const hours = timeTaken % 24;
  const time = `${hours > 0 && hours} ${hours > 1 ? 'hours' : 'hour'}
    ${minutes > 0 && minutes} ${minutes > 1 ? 'minutes' : 'minute'}
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

TimeCount.propTypes = {
  timeTaken: PropTypes.number.isRequired,
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      start: null,
      correctCount: 0,
      wrongCount: 0,
      startTime: 0,
      timeTaken: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleStart() {
    this.setState({
      start: true,
      correctCount: 0,
      wrongCount: 0,
      startTime: Date.now(),
      endTime: null,
    });
  }

  handleStop() {
    this.setState({
      start: false,
      endTime: Date.now(),
    });
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.setState(prevState =>
        ({ correctCount: prevState.correctCount + 1 }),
      );
    } else {
      this.setState(prevState =>
        ({ wrongCount: prevState.wrongCount + 1 }),
      );
    }
  }

  renderMainSection() {
    if (this.state.start === null) {
      return (
        <div>
          <Score correct={this.state.correctCount} wrong={this.state.wrongCount}/>
          {this.state.timeTaken ? <TimeCount timeTaken={this.state.timeTaken} /> : null}
          <StartButton handleClick={this.handleStart} />
        </div>
      );
    } else {
      return (
        <Question handleAnswer={this.handleAnswer} questionNumber={this.state.correctCount + this.state.wrongCount + 1}/>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/intute/web-assets/Logos/Intute-Logo-100.png" className="App-logo" alt="logo" />
          <h2>Welcome to Intute Mental Math</h2>
          {this.state.start ? <StopButton handleClick={this.handleStop} className="stop"/> : null}
        </div>
        <div className="content-container">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

export default App;
