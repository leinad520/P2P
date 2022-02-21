import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import data from './dummyQAdata.js';
import QAList from './QAList.jsx';
import ProductContext from '../Context/ProductContext.jsx';
import ModalWindow from '../sharedComponents/modalComponent/Modal.jsx';
import AddQuestionForm from './AddQuestionForm.jsx';
//this is the main component for the QA List
//will map over the data and render each QA List Entry




//has a Load More Answers Button
  //this button allows for more answers to appear

const QA = () => {
  const [search, setSearch] = useState('');
  const [initialQuestions, setInitialQuestions] = useState({
    results: []
  });
  const [passedQuestions, setPassedQuestions] = useState([]);
  const [show, setShow] = useState(false);

  const productContext = useContext(ProductContext);
  const { product } = productContext;

  useEffect(()=> {
    if (product.id) {
    getAllQuestions();
  }
}, [product.id]);


  let searchHandler = (e) => {
    console.log('this is e.target.value:', e.target.value);
    e.preventDefault();
    setSearch(e.target.value);
  };


  let getAllQuestions = () => {
    axios.get(`/qa/questions/${product.id}`)
      .then(response => {
        setInitialQuestions(response.data)
      })
      .catch(() => { console.log('error'); });
  };

  let showModal = () => {
    setShow(!show);
  };

  console.log('this is initialQuestions:', initialQuestions.results);

  //filter the questions array based on the search state when search state is greater than or equal to 3

  let moreAnswerQuestionsButton = () => {
    if (initialQuestions.results.length > 2) {
      return <button>More Answered Questions</button>
    } else {
      return <></>
    }
  }

  // var filteredArr = props.userMovies.filter((movie) => {
  //   return movie.title.toLowerCase().includes(props.currentSearch.toLowerCase());


  return (
    <>
      <h3>QUESTION & ANSWERS</h3>
      <div className="questions-answers-main">
        <section >
          <div className="searchContainer">
            <form className="searchForm">
              <input className="searchInput" onChange={searchHandler} type="text" id="q-input" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
              <button id="q-btn-search">Search</button>
            </form>
          </div>
        </section>
        <div id="qa-list">
          <QAList search={search} getAllQuestions={getAllQuestions} questions={initialQuestions} />
        </div>
        <div>
          <div>
            {moreAnswerQuestionsButton()}
            <span className="add-question">
            <button id="add-question-btn" onClick={e => showModal()}>Add a Question           +</button>
            <div>
              <ModalWindow onClose={showModal} show={show}>
                <AddQuestionForm product={product}/>
              </ModalWindow>
            </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

  //need to refactor to functional and use Hooks to use modal
// class QA extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       search: '',
//       questions: {
//         results: [],
//       },
//     }

//     this.searchHandler = this.searchHandler.bind(this);
//     this.getAllQuestions = this.getAllQuestions.bind(this);
//   }

//   searchHandler(e) {
//     e.preventDefault();
//     this.setState({
//       search: e.target.value
//     });
//   }

//   componentDidMount() {
//     this.getAllQuestions();
//   }

//   getAllQuestions() {
//     axios.get(`/qa/questions/${this.props.productId}`)
//       .then((response) => {
//         this.setState({
//           questions: response.data
//         });
//       })
//       .catch(() => { console.log('error'); });
//   }

// // need to add Modal and AddQuestionForm under button

// render () {
//   return (
//     <>
//     <h3>QUESTION & ANSWERS</h3>
//     <div className="questions-answers-main">
//     <section >

//     <div className="searchContainer">
//       <form className="searchForm">
//         <input className="searchInput" onChange={this.searchHandler} type="text" id="q-input" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
//         <button id="q-btn-search">Search</button>
//       </form>
//       </div>
//     </section>
//     <div id="qa-list">
//     <QAList getAllQuestions={this.getAllQuestions} data={this.state.questions}/>
//     </div>
//     <div>
//       <div>
//       <button>More Answered Questions</button>
//       <button>Add a Question           +</button>

//       </div>
//     </div>
//     </div>
//     </>
//   )
// }
// }






export default QA;