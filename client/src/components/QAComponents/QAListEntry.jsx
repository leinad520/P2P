import React, { useState } from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';
import ModalWindow from '../sharedComponents/modalComponent/Modal.jsx';
import AddQuestionForm from './AddQuestionForm.jsx';
//main component that will have many things

//contains
  //questionEntry (might want to be it's own component)
  //AnswerEntry (might want to be it's own component)

  //text which displays what username submitted answer

const QAListEntry = (props) => {
  const [helpful, setHelpful] = useState(false);
  const [report, setReport] = useState(false);
  const [helpfulQCount, setHelpfulQCount] = useState(props.question.question_helpfulness);
  const [show, setShow] = useState(false);

  let handleHelpfulQuestionClick = (e) => {
    // console.log('this is firing');
    const { question_id } = props.question;
    if (!helpful) {
    axios.put(`/qa/questions/${question_id}/helpful`)
      .then(response => {
        let updatedCount = helpfulQCount + 1;
        // console.log('state is being changed');
        // console.log('this is updatedCount: ', updatedCount);
        setHelpfulQCount(updatedCount);
        setHelpful(!helpful);
      })
      .catch(err => {
        console.error(err);
      })
    }
  };

  let showModal = () => {
    setShow(!show);
  };


  let answers = [];

  for (let answer in props.question.answers) {
    answers.push(props.question.answers[answer]);
  }

  let slicedAns = answers.slice(0, 2);
  let remainingAns = answers.slice(2);


  return (
    <>
      <div className="question">
        <span id="Q">Q:</span>
        <span>{props.question.question_body}</span>
        <span className="question-utility">
          <span id="q-helpful">
            <span>{'     '} Helpful? {'     '} </span>
            <u onClick={handleHelpfulQuestionClick}>Yes</u> ({helpfulQCount}) |
            <span>{'     '}</span>
            <span className="add-answer">
              <button id="add-answer-btn" onClick={e => showModal()}>
                <u>Add Answer</u>
              </button>
              <div>
              <ModalWindow onClose={showModal} show={show}>
                <AddQuestionForm />
              </ModalWindow>
              </div>
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

export default QAListEntry;
// class QAListEntry extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       helpful: false,
//       report: false,
//       helpfulQCount: this.props.question.question_helpfulness,
//       show: false,
//     }
//     this.handleHelpfulQuestionClick = this.handleHelpfulQuestionClick.bind(this)
//     this.showModal = this.showModal.bind(this)
//   }


//need to display up to two answers initially
//remaining questions and answers should be hidden until user loads them by hitting more Answered Questions button



// render() {
//   // console.log('this is this.props.question:', this.props.question.answers);
//   let answers = [];
//   for (let answer in this.props.question.answers) {
//     answers.push(this.props.question.answers[answer]);
//   }
//   let slicedAns = answers.slice(0, 2);
//   let remainingAns = answers.slice(2);
//   return (
//     <>
//       <div className="question">
//         <span id="Q">Q:</span>
//         <span>{this.props.question.question_body}</span>
//         <span className="question-utility">
//           <span id="q-helpful">
//             <span>{'     '} Helpful? {'     '} </span>
//             <u onClick={this.handleHelpfulQuestionClick}>Yes</u> ({this.state.helpfulQCount}) |
//             <span>{'     '}</span>
//             <span className="add-answer">
//               <button id="add-answer-btn" onClick={e => this.showModal()}>
//                 <u>Add Answer</u>
//               </button>
//               <ModalWindow className={"modalte"} onClose={this.showModal} show={this.state.show}>
//               this is the modal window
//               </ModalWindow>
//             </span>
//           </span>
//         </span>
//       </div>
//       <div className="answer">
//         <div>
//           <span id="A">A: </span>
//           <span>
//             {slicedAns.map((answer, index) => {
//               return <Answer answer={answer} key={index} />
//             })}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }
// }
