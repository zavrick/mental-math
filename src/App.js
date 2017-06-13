import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const equation = this.randomEquation();
    const question = equation.question;
    const answer = equation.answer;

    this.state = {
      question,
      answer,
      correctCount: 0,
      wrongCount: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.answerInput.focus();
  }

  randomNumber(ceiling = 50) {
    return Math.floor((Math.random() * ceiling) + 1);
  }
  randomOperator() {
    var operators = ['+', '-', '*', '/'];
    var operator = operators[Math.floor(Math.random()*operators.length)];
    return operator;
  }
  randomEquation() {
    const operator = this.randomOperator();
    let num1, num2, question, answer;
    switch(operator) {
      case '*':
        num1 = this.randomNumber(12);
        num2 = this.randomNumber(12);
        question = `${num1} ${operator} ${num2}`.replace('*', '×');
        answer = eval(`${num1} ${operator} ${num2}`);
        break;
      case '-':
        num1 = this.randomNumber();
        num2 = this.randomNumber(num1);
        question = `${num1} ${operator} ${num2}`;
        answer = eval(`${num1} ${operator} ${num2}`);
        break;
      case '/':
        answer = this.randomNumber(12);
        num2 = this.randomNumber(12);
        num1 = eval(`${answer} * ${num2}`);
        question = `${num1} ${operator} ${num2}`.replace('/', '÷');
        break
      default:
        num1 = this.randomNumber();
        num2 = this.randomNumber();
        question = `${num1} ${operator} ${num2}`;
        answer = eval(`${num1} ${operator} ${num2}`);
        break;
    }
    return {
      question,
      answer
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Regen question
    let equation = this.randomEquation();
    let question = equation.question;
    let answer = equation.answer;

    if (parseInt(this.answerInput.value, 10) === parseInt(this.state.answer, 10)) {
      console.log('correct');
      this.setState({
        correctCount: this.state.correctCount + 1,
        question,
        answer
      }, this.answerInput.value = '');
    } else {
      console.log('wrong', this.state.answer);
      this.setState({
        wrongCount: this.state.wrongCount + 1,
        question,
        answer
      }, this.answerInput.value = '');
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/intute/web-assets/Logos/Intute-Logo-100.png" className="App-logo" alt="logo" />
          <h2>Welcome to Intute Mental Math</h2>
        </div>
        <p className="question-text">
          {this.state.question} = ?
        </p>
        <form id='form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input type='number' ref={i => this.answerInput = i} className='form-control' placeholder='Answer?'></input>
          </div>
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
