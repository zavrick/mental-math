import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Question.css';

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

  static genRandNum({ max = 99 } = {}) {
    const min = 0;
    const bias = Math.floor((max / 3) * 2);
    const influence = 1; // tweak this to minimise / maximise deviation
    const rnd = (Math.random() * (max - min)) + min;
    const mix = Math.random() * influence;
    return Math.floor((rnd * (1 - mix)) + (bias * mix)) + 1;
  }

  static getMaxPlusNum(difficulty) {
    switch (difficulty) {
      case 1:
        return 9;
      case 2:
        return 30;
      case 3:
        return 50;
      default:
        return 50;
    }
  }

  static getMaxMultNum(difficulty) {
    switch (difficulty) {
      case 1:
        return 3;
      case 2:
        return 9;
      case 3:
        return 12;
      default:
        return 12;
    }
  }

  constructor(props) {
    super(props);
    const equation = this.makeRandEq();
    const question = equation.question;
    const answer = equation.answer;
    this.state = { question, answer };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.answerInput.focus();
  }

  componentDidUpdate() {
    this.answerInput.focus();
  }

  makeRandEq() {
    const difficulty = this.props.difficulty;
    const maxPlusNum = Question.getMaxPlusNum(difficulty);
    const maxMultNum = Question.getMaxMultNum(difficulty);
    let num1;
    let num2;
    let answer;
    const operator = Question.genRandOpr();

    switch (operator) {
      case 'x':
        num1 = Question.genRandNum({ max: maxMultNum });
        num2 = Question.genRandNum({ max: maxMultNum });
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
      case '÷':
        answer = Question.genRandNum({ max: maxMultNum });
        num2 = Question.genRandNum({ max: maxMultNum });
        num1 = Question.evaluate({ opr: 'x', a: answer, b: num2 });
        break;
      case '-':
        num1 = Question.genRandNum({ max: maxPlusNum });
        num2 = Question.genRandNum({ max: num1 - 1 });
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
      default:
        num1 = Question.genRandNum({ max: maxPlusNum });
        num2 = Question.genRandNum({ max: maxPlusNum });
        answer = Question.evaluate({ opr: operator, a: num1, b: num2 });
        break;
    }

    const question = `${num1} ${operator} ${num2}`;
    return {
      question,
      answer,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Regen question
    const equation = this.makeRandEq();
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
              className="Form__input"
              placeholder="Answer?"
            />
          </div>
          <p className="QuestionForm__helper"> or just press &quot;Enter&quot; </p>
          <button type="submit" className="QuestionForm__submit Button">Submit</button>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  difficulty: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default Question;
