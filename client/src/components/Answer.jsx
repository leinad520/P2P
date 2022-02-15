import React from 'react';

var Answer = (props) => {
  return (
    <div>
    {props.answer.body};
    <div>by {props.answer.answerer_name} </div>
    </div>
  )
}

export default Answer;