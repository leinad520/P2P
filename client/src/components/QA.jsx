import React from 'react';
import axios from 'axios';
import data from '../dummyQAdata.js';
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
      questions: [],
      answers: [],
    }

    this.searchHandler = this.searchHandler.bind(this);
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
    axios.get()
  }



render () {
  // console.log('this is data:', data);
  return (
    <>
    <h3>QUESTION & ANSWERS</h3>
    <section>
      <form>
        <input onChange={this.searchHandler} type="text" id="q-input" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
        <button id="q-btn-search">Search</button>
      </form>
    </section>
    <div id="qa-list">
    <QAList data={data}/>
    </div>
    <div>
      <div>
      <button>More Answered Questions</button>
      <button>Add a Question           +</button>

      </div>
    </div>
    </>
  )
}
}






export default QA;