import React from 'react';
import axios from 'axios';
import data from './dummyQAdata.js';
import QAList from './QAList.jsx';
//this is the main component for the QA List
//will map over the data and render each QA List Entry




//has a Load More Answers Button
  //this button allows for more answers to appear

class QA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      questions: {
        results: [],
      },
    }

    this.searchHandler = this.searchHandler.bind(this);
    this.getAllQuestions = this.getAllQuestions.bind(this);
  }

  //create handler to change state of search to whatever the input user provides

  searchHandler(e) {
    console.log('this is firing');
    console.log('this is e.target.value: ', e.target.value);
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    axios.get(`/qa/questions/${this.props.productId}`)
      .then((response) => {
        this.setState({
          questions: response.data
        });
      })
      .catch(() => { console.log('error'); });
  }



render () {
  return (
    <>
    <h3>QUESTION & ANSWERS</h3>
    <div className="questions-answers-main">
    <section >

    <div className="searchContainer">
      <form className="searchForm">
        <input className="searchInput" onChange={this.searchHandler} type="text" id="q-input" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
        <button id="q-btn-search">Search</button>
      </form>
      </div>
    </section>
    <div id="qa-list">
    <QAList data={this.state.questions}/>
    </div>
    <div>
      <div>
      <button>More Answered Questions</button>
      <button>Add a Question           +</button>

      </div>
    </div>
    </div>
    </>
  )
}
}






export default QA;