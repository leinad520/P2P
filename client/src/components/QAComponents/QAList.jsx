import React from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => {
  let slicedFour = props.data.results.slice(0, 4);
  // console.log('this is slicedFour: ', slicedFour);
  return (
  <div>
  {slicedFour.map((question, index) => {
    {/* {console.log('question' , props.data.results)} */}
    return <QAListEntry getAllQuestions={props.getAllQuestions} question={question} key={index}/>
  })}
  </div>
)
};

export default QAList;