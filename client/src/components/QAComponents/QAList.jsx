import React, {useState} from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => {
  // Implmenet a counter state in QA -- DONE
  // set counter state as the 2nd arg in "slice" -- DONE
  // build func in <QA> that increments counter state by 2
  // onClick of "show more questions" button should fire this function

  // console.log('this is props.data:', props.data);
  let sliced = props.questions.slice(0, props.counter);
  // console.log('this is slicedFour: ', slicedFour);
  // let remainingQs = props.questions.slice(4);

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