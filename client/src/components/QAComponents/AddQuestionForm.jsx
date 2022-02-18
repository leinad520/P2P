import React, {useState} from 'react';
import axios from 'axios';




const AddQuestionForm = (props) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  return (
    // <div>testing modal</div>
    <div className="add-answer-modal-container">
      <div className="add-answer-form-container">
        <form id="add-answer-form">
          <h3>Submit your Answer</h3>
          <h4>[Product Name] : [Question Body]</h4>
          <input type="text" name="yourAnswer" placeholder="Your Answer"/>
          <input type="text" name="yourNickname" placeholder="What is your nickname?"/>
          <input type="text" name="yourEmail" placeholder="Your Email"/>
          <input placeholder="Upload your photos"/>
          <button>Submit Answer</button>

        </form>

      </div>
    </div>
  )
}

export default AddQuestionForm;