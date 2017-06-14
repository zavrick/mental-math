import React, { Component } from 'react';
import './App.css';
import { Question } from './components';

const Start = (props) => {
  return (
    <button className='btn btn-primary' onClick={props.onStart}>
      Start
    </button>
  );
}

const Stop = (props) => {
  return (
    <button className='btn' onClick={props.onStop}>
      Stop
    </button>
  );
}

const Score = ({ correct, wrong }) => {
  if (correct + wrong !== 0) {
    return (
      <div className='score'>
        You got {correct} out of {correct + wrong} correct!
      </div>
    );
  } else {
    return (
      <div className='score'>
        Press the "Start" button when you are ready!
      </div>
    );
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      correctCount: 0,
      wrongCount: 0
    };
  }

  handleStart() {
    this.setState({
      start: true,
      correctCount: 0,
      wrongCount: 0
    });
  }

  handleStop() {
    this.setState({
      start: null
    });
  }

  handleAnswer(answer_correct) {
    if (answer_correct) {
      this.setState({
        correctCount: this.state.correctCount + 1
      });
    } else {
      this.setState({
        wrongCount: this.state.wrongCount + 1
      });
    };
  }

  renderMainSection() {
    if (this.state.start === null) {
      return (
        <div>
          <Score correct={this.state.correctCount} wrong={this.state.wrongCount}/>
          <Start onStart={this.handleStart.bind(this)}/>
        </div>
      );
    } else {
      return (
        <Question handleAnswer={this.handleAnswer.bind(this)} questionNumber={this.state.correctCount + this.state.wrongCount + 1}/>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/intute/web-assets/Logos/Intute-Logo-100.png" className="App-logo" alt="logo" />
          <h2>Welcome to Intute Mental Math</h2>
          {this.state.start ? <Stop onStop={this.handleStop.bind(this)} className='stop'/> : null}
        </div>
        <div className='content-container'>
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

export default App;
