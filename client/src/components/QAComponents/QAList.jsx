import React from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => {
  let slicedFour = props.data.results.slice(0, 4);
  // console.log('this is slicedFour: ', slicedFour);
  let remainingQs = props.data.results.slice(4);
  console.log('this is remainingQs:', remainingQs);
  return (
  <div>
  {slicedFour.map((question, index) => {
    {/* {console.log('question' , props.data.results)} */}
    return <QAListEntry productId={props.productId} getAllQuestions={props.getAllQuestions} question={question} key={index}/>
  })}
  </div>
)
};

export default QAList;