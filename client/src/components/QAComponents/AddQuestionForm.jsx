import React, {useState, useContext} from 'react';
import axios from 'axios';
import ProductContext from '../Context/ProductContext.jsx';



const AddQuestionForm = (props) =》 {
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

  {console.log('this is product,': product)};
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    axios.post(`/qa/questions/{}`, {
      body: state.qQuestion,
      name: state.qNickname,
      email: state.qEmail,
      product_id:
    })
  }

  return(

    <div className="add-question-modal-container">
      <div className="add-question-form-container">
        <form id="add-question-form" onSubmit={handleQuestionSubmit}>
          <h3 id="add-question-title">Ask Your Question</h3>
          <h4 id="add-question-subtitle">About the {product.name}</h4>
          <div>
            <div>Your Question
            <textarea id="qQuestion" type="text" name="qQuestion" placeholder="Your question here" value={state.mQuestion} onChange={handleQFormChange}/>
            </div>
            <div>
              <div>What is your nickname?
              <textarea id="qNickname" type="text" name="qNickname" placeholder="Example: jackson11!" value={state.qNickname} onChange={handleQFormChange}/>
              </div>
              <span>For privacy reasons, do not use your full name or email address</span>
            </div>
            <div>
              <div>Your email
              <textarea id="qEmail" type="text" name="qEmail" placeholder="Why did you like the product or not?" value={state.mEmail} onChange={handleQFormChange}/>
              </div>
              <span>For authentication reasons, you will not be emailed</span>
            </div>
            <button type="submit" id="add-question-submit">Submit Question</button>
          </div>
        </form>
      </div>
    </div>


  )




}

export default AddQuestionForm;