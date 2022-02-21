import React from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => {
  // console.log('this is props.data:', props.data);

  let slicedFour = props.questions.results.slice(0, 4);
  // console.log('this is slicedFour: ', slicedFour);
  let remainingQs = props.questions.results.slice(4);

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