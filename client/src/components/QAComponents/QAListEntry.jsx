import React from 'react';
import Answer from './Answer.jsx';
//main component that will have many things

//contains
  //questionEntry (might want to be it's own component)
  //AnswerEntry (might want to be it's own component)

  //text which displays what username submitted answer

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: [],
      answer: []
    }
  }


//need to display up to two answers initially
//remaining questions and answers should be hidden until user loads them by hitting more Answered Questions button

render() {
  var answers = [];
  for (let answer in this.props.question.answers) {
    answers.push(this.props.question.answers[answer]);
  }

  console.log('this.props.question:', this.props.question);

  return (
    <>
    <div className="question">
    <span id="Q">Q:</span>
    <span>{this.props.question.question_body} - {this.props.question.asker_name}</span>
    <span className="question-utility">
    <span id="q-helpful">{'     '} Helpful? {'     '}
    <u>Yes</u> ({this.props.question.question_helpfulness}) |
    <span>{'     '}
    <button id="add-answer-btn">
     Add Answer
    </button>
    </span>
    </span>
    </span>
    </div>
    <div className="answer">
    {answers.map((answer, index) => {
      return <Answer answer={answer} key={index}/>
    })}
    </div>
    </>
  );
}
}

export default QAListEntry;