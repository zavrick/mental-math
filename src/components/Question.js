import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);

    const equation = this.randomEquation();
    const question = equation.question;
    const answer = equation.answer;

    this.state = {
      question,
      answer
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
      this.props.handleAnswer(true);
      this.setState({
        question,
        answer
      }, this.answerInput.value = '');
    } else {
      this.props.handleAnswer(false);
      this.setState({
        question,
        answer
      }, this.answerInput.value = '');
    }
  }

  render() {
    return (
      <div className='question'>
        <p className='question-number'>
          #{this.props.questionNumber}
        </p>
        <p className='question-text'>
          {this.state.question} = ?
        </p>
        <form id='form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input type='number' ref={i => this.answerInput = i} className='form-control' placeholder='Answer?'></input>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

export { Question };
