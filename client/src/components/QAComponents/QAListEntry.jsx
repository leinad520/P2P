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
      report: false,
      helpfulQCount: this.props.question.question_helpfulness,

    }
    this.handleHelpfulQuestionClick = this.handleHelpfulQuestionClick.bind(this)
  }


//need to display up to two answers initially
//remaining questions and answers should be hidden until user loads them by hitting more Answered Questions button

  handleHelpfulQuestionClick(e) {
    // console.log('this is firing');
    const { question_id } = this.props.question
    if (!this.state.helpful) {
    axios.put(`/qa/questions/${question_id}/helpful`)
      .then(response => {
        let updatedCount = this.state.helpfulQCount + 1;
        // console.log('state is being changed');
        // console.log('this is updatedCount: ', updatedCount);
        this.setState({
          helpfulQCount: updatedCount,
          helpful: !this.state.helpful
        })
      })
      .catch(err => {
        console.error(err);
      })
    }
  }





render() {
  // console.log('this is this.props.question:', this.props.question.answers);
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
            <u onClick={this.handleHelpfulQuestionClick}>Yes</u> ({this.state.helpfulQCount}) |
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