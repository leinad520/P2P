import React from 'react';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpful: false,
      helpfulACount: this.props.answer.helpfulness
    }
    this.handleHelpfulAnswerClick = this.handleHelpfulAnswerClick.bind(this)
    this.newDate = this.newDate.bind(this);
    this.answererName = this.answererName.bind(this);
  }

  handleHelpfulAnswerClick(e) {
    const { id } = this.props.answer
    if (!this.state.helpful) {
    axios.put(`/qa/answers/${id}/helpful`)
    .then(response => {
      let updatedCount = this.state.helpfulACount + 1;
      this.setState({
        helpfulACount: updatedCount,
        helpful: !this.state.helpful,
      })
    })
    .catch(err => {
      console.error(err);
    })
  }
  }

  newDate(date) {
    let newDate = new Date(date).toString().slice(4, 15);
    let newDateMonthAndDay = newDate.slice(0, 6);
    let newDateYear = newDate.slice(6);
    return newDateMonthAndDay + ', ' + newDateYear;

  }

  answererName() {
    let answerer;
    if (this.props.answer.answerer_name === "Seller") {
      answerer = <b>{this.props.answer.answerer_name}</b>
    } else {
      answerer = this.props.answer.answerer_name;
    }
    return answerer;
  }

  render() {

    return (
      <div className="answerBody">
        <div id="answer">
          <span>{this.props.answer.body}</span>
        </div>
        <div id="sellerInfo">by {this.answererName()} , {this.newDate(this.props.answer.date)}
          <span>| Helpful?
            <span id="answer-helpfulness">
              <span> <u onClick={this.handleHelpfulAnswerClick}>Yes</u>
                ({this.state.helpfulACount}) |
              </span>
            </span>
          </span>
          <span id="report"><u>Report</u></span>
        </div>
      </div>
    )
  }
}




// var Answer = (props) => {
//   // console.log('this is props in answer:', props);
//   return (
//     <div className="answerBody">
//       <div id="answer">
//         <span>{props.answer.body}</span>
//       </div>
//       <div id="sellerInfo">by {props.answer.answerer_name} , {props.answer.date}
//         <span>| Helpful?
//         <span id="answer-helpfulness">
//         <span><u>Yes</u> ({props.answer.helpfulness}) |</span>
//         </span>
//         </span>
//         <span id="report"><u>Report</u></span>
//       </div>
//     </div>
//   )
// }

export default Answer;