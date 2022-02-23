import React, {useState} from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => {

  let filteredSearchArray = () => {
    if (props.search.length >= 3) {
      return props.questions.filter((question) => {
        return question.question_body.toLowerCase().includes(props.search.toLowerCase());
      });
    }
    return props.questions;
  }

  let sliced = filteredSearchArray().slice(0, props.counter);

  return (
  <div>
    {sliced.map((question, index) => {
      {/* {console.log('question' , props.data.results)} */}
      return <QAListEntry productId={props.productId} getAllQuestions={props.getAllQuestions} question={question} key={index}/>
    })}
  </div>
)
};

export default QAList;