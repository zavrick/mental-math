import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  static evaluate({ opr, a, b }) {
    switch (opr) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case 'x':
        return a * b;
      case '÷':
        return a / b;
      default:
        return 0;
    }
  }

  static genRandOpr() {
    const operators = ['+', '-', 'x', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    return operator;
  }

  static genRandNum({ max = 50 } = {}) {
    return Math.floor((Math.random() * max) + 1);
  }

  static makeRandEq() {
    const operator = Question.genRandOpr();
    let num1;
    let num2;
    let question;
    let answer;
    switch (operator) {
      case 'x':
        num1 = Question.genRandNum({ max: 12 });
        num2 = Question.genRandNum({ max: 12 });
        question = `${num1} ${operator} ${num2}`;
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
      case '÷':
        answer = Question.genRandNum({ max: 12 });
        num2 = Question.genRandNum({ max: 12 });
        num1 = Question.evaluate({ opr: 'x', a: answer, b: num2 });
        question = `${num1} ${operator} ${num2}`;
        break;
      case '-':
        num1 = Question.genRandNum();
        num2 = Question.genRandNum({ max: num1 });
        question = `${num1} ${operator} ${num2}`;
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
      default:
        num1 = Question.genRandNum();
        num2 = Question.genRandNum();
        question = `${num1} ${operator} ${num2}`;
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
    }
    return {
      question,
      answer,
    };
  }

  constructor(props) {
    super(props);

    const equation = Question.makeRandEq();
    const question = equation.question;
    const answer = equation.answer;

    this.state = {
      question,
      answer,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.answerInput.focus();
  }

  componentDidUpdate() {
    this.answerInput.focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    // Regen question
    const equation = Question.makeRandEq();
    const question = equation.question;
    const answer = equation.answer;
    const isCorrect = Math.floor(this.answerInput.value) === Math.floor(this.state.answer);

    this.props.handleAnswer(isCorrect);
    this.setState({ question, answer });
    this.answerInput.value = '';
  }

  render() {
    const questionNumber = this.props.questionNumber;
    const question = this.state.question;

    return (
      <div className="question">
        <p className="question-number">
          #{questionNumber}
        </p>
        <p className="question-text">
          {question} = ?
        </p>
        <form id="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="number"
              ref={i => this.answerInput = i}
              className="form-control"
              placeholder="Answer?"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default Question;
