import React from 'react';
var Answer = (props) => {
  // {console.log('this is props.answer:' , props.answer)};
  return (
    <div className="answerBody">
    <div id="answer">A: {props.answer.body}</div>
    <div id="sellerName">by {props.answer.answerer_name} , {props.answer.date}
    <span>| Helpful?
    <span id="answer-helpfulness">
    <span><u>Yes</u> ({props.answer.helpfulness}) |</span>      </span></span>
    <span id="report">Report</span>
    </div>
    </div>
  )
}

export default Answer;