import React from 'react';
import axios from 'axios';
import css from './Answer.css';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpful: false,
      helpfulACount: this.props.answer.helpfulness,
      reported: false
    }
    this.handleHelpfulAnswerClick = this.handleHelpfulAnswerClick.bind(this)
    this.newDate = this.newDate.bind(this);
    this.answererName = this.answererName.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
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

  handleReportClick(e) {
    console.log('report click is firing');
    const { id } = this.props.answer
    console.log('this is id:', id);
    if (!this.state.reported) {
      axios.put(`/qa/answers/${id}/report`)
      .then(response => {
        this.setState({
          reported: !this.state.reported
        })
      })
      .then(response => {console.log('answer has been reported')})
      .catch(err => {
        console.error(err)
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
      answerer = <b><i>{this.props.answer.answerer_name}</i></b>
    } else {
      answerer = <i>{this.props.answer.answerer_name}</i>
    }
    return answerer;
  }

  render() {
    console.log(this.props.answer);
    return (
      <div className="answerBody">
        <div id="answer">
         {this.props.answer.body}
        </div>
        <div id="sellerInfo">
        <span>by {this.answererName()}, {this.newDate(this.props.answer.date)}</span>
          <span>| Helpful?
            <span id="answer-helpfulness">
              <span> <u onClick={this.handleHelpfulAnswerClick}>Yes</u>
                ({this.state.helpfulACount}) |
              </span>
            </span>
          </span>
          <span id="report" className="answer-report-btn">{!this.state.reported ?  <span onClick={this.handleReportClick}>Report</span> : <u>Reported</u>}</span>
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