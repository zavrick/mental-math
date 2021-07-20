import React, { Component } from 'react';
import './css/App.css';
import { StopButton, StartedContent, StoppedContent } from './components';

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
