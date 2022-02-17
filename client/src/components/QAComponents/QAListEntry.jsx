import React from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';
//main component that will have many things

//contains
  //questionEntry (might want to be it's own component)
  //AnswerEntry (might want to be it's own component)

  //text which displays what username submitted answer

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpful: false,
      report: false
    }
    this.handleHelpfulQuestionClick = this.handleHelpfulQuestionClick.bind(this)
  }


//need to display up to two answers initially
//remaining questions and answers should be hidden until user loads them by hitting more Answered Questions button

  handleHelpfulQuestionClick(e) {
    if (!this.state.helpful) {
      const { question_id } = this.props.question
      axios.put(`/qa/questions/${question_id}/helpful`, {
        question_helpfulness: this.props.question.question_helpfulness++
      })
        .then(response => {
          this.props.getAllQuestions();
        })
        .then(response => {
          this.setState({
            helpful: !this.state.helpful
          })
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }


render() {
  let answers = [];
  for (let answer in this.props.question.answers) {
    answers.push(this.props.question.answers[answer]);
  }
  let slicedAns = answers.slice(0, 2);
  let remainingAns = answers.slice(2);



  return (
    <>
      <div className="question">
        <span id="Q">Q:</span>
        <span>{this.props.question.question_body}</span>
        <span className="question-utility">
          <span id="q-helpful">
            <span>{'     '} Helpful? {'     '} </span>
            <u onClick={this.handleHelpfulQuestionClick}>Yes</u> ({this.props.question.question_helpfulness}) |
            <span>{'     '}</span>
            <span className="add-answer">
              <button id="add-answer-btn">
                <u>Add Answer</u>
              </button>
            </span>
          </span>
        </span>
      </div>
      <div className="answer">
        <div>
          <span id="A">A: </span>
          <span>
            {slicedAns.map((answer, index) => {
              return <Answer answer={answer} key={index} />
            })}
          </span>
        </div>
      </div>
    </>
  );
}
}

export default QAListEntry;