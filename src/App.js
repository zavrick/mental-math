import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const equation = this.randomEquation();
    const answer = eval(equation);

    this.state = {
      equation,
      answer,
      correctCount: 0,
      wrongCount: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  randomNumber(ceiling = 100) {
    return Math.floor((Math.random() * ceiling) + 1);
  }
  randomOperator() {
    var operators = ['+', '-', '*'];
    var operator = operators[Math.floor(Math.random()*operators.length)];
    return operator;
  }
  randomEquation() {
    let operator = this.randomOperator();
    let num1, num2;
    switch(operator) {
      case '*':
        num1 = this.randomNumber(12);
        num2 = this.randomNumber(12);
        break;
      case '-':
        num1 = this.randomNumber();
        num2 = this.randomNumber();
        while (num1 < num2) {
          num1 = this.randomNumber();
          num2 = this.randomNumber();
        }
          break;
      default:
        num1 = this.randomNumber();
        num2 = this.randomNumber();
        break;
    }
    return `${num1} ${operator} ${num2}`;
  }

  handleSubmit(event) {
    event.preventDefault();

    // Regen question
    let equation = this.randomEquation();
    let answer = eval(equation);

    if (parseInt(this.answerInput.value, 10) === parseInt(this.state.answer, 10)) {
      this.setState({
        correctCount: this.state.correctCount + 1,
        equation,
        answer
      }, this.answerInput.value = '');
      console.log('correct');
    } else {
      this.setState({
        wrongCount: this.state.wrongCount + 1,
        equation,
        answer
      }, this.answerInput.value = '');
      console.log('wrong', this.state.answer);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Intute Mental Math</h2>
        </div>
        <p className="App-intro">
          {this.state.equation} = ?
        </p>
        <form id='form' onSubmit={this.handleSubmit}>
          <input type='number' ref={i => this.answerInput = i} placeholder='Answer?'></input>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
        <br/>
        <br/>
        <div>
          {this.state.correctCount + this.state.wrongCount !== 0 ? `${this.state.correctCount}/${this.state.correctCount + this.state.wrongCount}` : ''}
        </div>
      </div>
    );
  }
}

export default App;
