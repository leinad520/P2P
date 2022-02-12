import React from 'react';

var Answer = (props) => {
  {console.log('this is props.answer:' , props.answer)};
  return (
    <div>
    {props.answer.body};
    <div>by {props.answer.answerer_name} </div>
    </div>
  )
}

export default Answer;