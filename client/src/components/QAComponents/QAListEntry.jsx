import React, { useState } from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';
import ModalWindow from '../sharedComponents/modalComponent/Modal.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
import css from './QAListEntry.css';

const QAListEntry = (props) => {
  const [helpful, setHelpful] = useState(false);
  const [report, setReport] = useState(false);
  const [helpfulQCount, setHelpfulQCount] = useState(props.question.question_helpfulness);
  const [show, setShow] = useState(false);
  const [answersCount, setAnswersCount] = useState(2);
  // const [moreAnswersClicked, setMoreAnswerClicked] = useState(false);

  // SORT ANSWER LOGIC:
  // Filter all seller answers out. Sort that array by helpfulness.
  // In non-seller answer array, sort answers by most helpful.
  // Finally, concat seller array with answer array.

  // SORT ANSWER LOGIC:
  //sort answers array with seller as priority
    //create left and right array
    //if answer is from seller, push to left array
    //else, push answer to right array
    //concat answers

  let answers = [];
  for (let answer in props.question.answers) {
    answers.push(props.question.answers[answer]);
  }

  // console.log(answers);

  function quicksortHelpful(array) {
    if (array.length <= 1) {
      return array;
    }
    let pivot = array[0];
    let left = [];
    let right = [];

    for (var i = 1; i < array.length; i++) {
      array[i].helpfulness > pivot.helpfulness ? left.push(array[i]) : right.push(array[i])
    }
    return quicksortHelpful(left).concat(pivot, quicksortHelpful(right));
  }

  function quicksortSeller(array) {
    if (array.length <= 1) {
      return array;
    }

  var left = [];
  var right = [];
  for (var i = 0; i < array.length; i++) {
    array[i].answerer_name === "Seller" ? left.push(array[i]) : right.push(array[i]);
  }
  return quicksortHelpful(left).concat(quicksortHelpful(right));
  }


  let sortedArray = quicksortSeller(answers);
  // console.log('this is sortedArray:', sortedArray);

  //for initial load and load more answers button click load
  let slicedAns = sortedArray.slice(0, answersCount);

  let handleHelpfulQuestionClick = (e) => {
    const { question_id } = props.question;
    if (!helpful) {
    axios.put(`/qa/questions/${question_id}/helpful`)
      .then(response => {
        let updatedCount = helpfulQCount + 1;
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

  //create function that sets initial answers state to full list of answers
  let onShowMoreAnswersClick = () => {
    if (answersCount > 2) {
      console.log('onShowMoreAnswersClick - setting answers to 2')
      setAnswersCount(2);
    } else {
      console.log('onShowMoreAnswersClick - setting answers to answer.length')
      setAnswersCount(answers.length);
    }
    // setMoreAnswerClicked(!moreAnswersClicked);
  }
  //set intiial answers state to length of all answers
  //attach function to onclick of load more answers button




  //if answers array has more than 2 answers, a link "see more answers" should be below the list
    //on "see more answers" button click, remaining answers are displayed
      //"see more answers" changes to "collapse answers"
  // console.log('this is answers: ', answers);
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
                <AddAnswerForm props={props}/>
              </ModalWindow>
              </div>
            </span>
          </span>
        </span>
      </div>
      <div className="answer">
          <div>
            <span id="A">A: </span>
            <div className={(answersCount > 2) ? "answers-list" : ""}>
              {slicedAns.map((answer, index) => {
                return <Answer answer={answer} key={index} />
              })}
            </div>
          </div>

        {(answers.length > 2) && <button id="see-more-answers-btn" onClick={onShowMoreAnswersClick}>{(answersCount > 2) ? 'Collapse Answers' : 'See More Answers'}</button>}
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
