import React from 'react';
import axios from 'axios';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: 42367, //Get from other component's state
      relatedCardIds: [],
      relatedCardObjs: []

    };

  }

  componentDidMount() {
    axios.get(`/api/${this.state.chosenCard}/related`)
    .then(res => {
      this.setState({relatedCardIds: res.data})
    })
    .then(() => { // Sometimes works, sometimes doesn't
      this.state.relatedCardIds.forEach(id =>
        axios.get(`/api/${id}`)
        .then(res => {
          this.setState({relatedCardObjs: [...this.state.relatedCardObjs, res.data]});
        })
        .catch(err => console.log(err))
      )
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="parent">
      {this.state.relatedCardObjs.map(card =>
        <div className="card">
          <div className="card-picture">hi</div>
          <div className="card-description">bye</div>
        </div>
      )}
      </section>
    )
  }

}

export default RelatedProducts;