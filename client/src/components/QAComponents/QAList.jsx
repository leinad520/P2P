import React from 'react';
import QAListEntry from './QAListEntry.jsx';

const QAList = (props) => (
  // {console.log('this is props within QAList: ', props.data)};
  <div>
  {props.data.results.map((question, index) => {
    {/* {console.log('question' , props.data.results)} */}
    return <QAListEntry question={question} key={index}/>
  })}
  </div>

);

export default QAList;