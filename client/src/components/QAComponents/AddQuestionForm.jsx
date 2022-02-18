import React, {useState, useContext} from 'react';
import axios from 'axios';
// import ProductContext from '../Context/ProductContext.jsx';



const AddQuestionForm = (props) => {
  const [state, setState] = useState({
    mAnswer: '',
    mNickname: '',
    mEmail: ''
  });
  // const [answer, setAnswer] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [email, setEmail] = useState('');

  let handleFormChange = (e) => {
    console.log('this is e.target.name', e.target.name);
    console.log('this is e.target.value', e.target.value);
    setState({
      [e.target.name]: e.target.value
    })
  }
  console.log('this is props:', props);
  return (

    <div className="add-answer-modal-container">
      <div className="add-answer-form-container">
        <form id="add-answer-form">
          <h3 id="add-answer-title">Submit your Answer</h3>
          <h4 id="add-answer-description">[Product Name] : {props.props.question.question_body}</h4>
          <div>
            <input type="text" name="mAnswer" placeholder="Your Answer" onChange={handleFormChange} />
          </div>
          <div>
            <input type="text" name="mNickname" placeholder="What is your nickname?" onChange={handleFormChange} />
          </div>
          <div>
            <input type="text" name="mEmail" placeholder="Your Email" onChange={handleFormChange} />
          </div>
          <input placeholder="Upload your photos"/>
          <div>
          <button>Submit Answer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuestionForm;