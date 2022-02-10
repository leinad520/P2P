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
    .then(() => {
      this.state.relatedCardIds.forEach(id =>
        axios.get(`/api/${id}`)
        .then(res => {
          this.state.relatedCardObjs.push(res.data);
        })
      )
    })
  }

  render() {
    return (
      <section>
      {this.state.relatedCardObjs.map(card =>
        <div className="card">
          <div className="card-picture"></div>
          <div className="card-description"></div>
        </div>
      )}
      </section>
    )
  }

}

export default RelatedProducts;