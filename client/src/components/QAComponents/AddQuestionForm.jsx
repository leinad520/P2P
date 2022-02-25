import React, {useState, useContext} from 'react';
import axios from 'axios';
import ProductContext from '../Context/ProductContext.jsx';



const AddQuestionForm = (props) => {
  const [state, setState] = useState({
    qQuestion: '',
    qNickname: '',
    qEmail: '',
  });

  const productContext = useContext(ProductContext);
  const { product } = productContext;

  const handleQFormChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    props.showModal();
    axios.post(`/qa/questions/${product.id}`, {
      body: state.qQuestion,
      name: state.qNickname,
      email: state.qEmail,
      product_id: product.id,
    })
    .then(response => {console.log('question was succesfully posted');
    })
    .then(response => {
      props.getAllQuestions();
    })
    .catch(err => {console.error(err);})
  }

  return(

    <div className="add-question-modal-container">
      <div className="add-question-form-container">
        <form id="add-answer-form" onSubmit={handleQuestionSubmit}>
          <h2 id="add-question-title">Ask Your Question</h2>
          <h4 id="add-question-subtitle">About the {product.name}</h4>
          <div>
            <div>Your Question*
            <textarea id="qQuestion" type="text" name="qQuestion" placeholder="Your question here" value={state.mQuestion} onChange={handleQFormChange} spellcheck="true" required="required"/>
            </div>
            <div id="q-nickname-div">
              <div >What is your nickname?*
              <textarea id="qNickname" type="text" name="qNickname" placeholder="Example: jackson11!" value={state.qNickname} onChange={handleQFormChange} required="required"/>
              </div>
              <div id="q-priv-span"><b>*For privacy reasons, do not use your full name or email address*</b></div>
            </div>
            <div id="q-email-div">
              <div >Your email*
              <textarea id="qEmail" type="email" name="qEmail" placeholder="Example: example@example.com" value={state.mEmail} onChange={handleQFormChange} required="required"/>
              </div>
              <div id="q-auth-span"><b>*For authentication reasons, you will not be emailed*</b></div>
            </div>
            <button type="submit" id="add-question-submit" >Submit Question</button>
          </div>
        </form>
      </div>
    </div>


  )




}

export default AddQuestionForm;