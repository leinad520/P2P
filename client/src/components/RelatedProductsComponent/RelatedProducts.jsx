import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'


class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: 42366, //Get from other component's state
      relatedCardIds: [],
      relatedCardObjs: [],
      relatedStyles: []
    };
  }

  componentDidMount() {
    axios.get(`/api/${this.state.chosenCard}/related`)
    .then(res => {
      this.setState({relatedCardIds: res.data})
    })
    .then(() => {
      let promiseArr = this.state.relatedCardIds.map(id =>
        axios.get(`/api/${id}`)
      )
      Promise.all(promiseArr)
      .then(values => {
        values.forEach(obj => {
          this.setState({relatedCardObjs: [...this.state.relatedCardObjs, obj.data]})
        })
      })
    })
    .then(() => {
      let promiseArr = this.state.relatedCardIds.map(id =>
        axios.get(`/products/${id}/styles`)
      )
      Promise.all(promiseArr)
      .then(values => {
        values.forEach(obj => {
          this.setState({relatedStyles: [...this.state.relatedStyles, obj.data.results[0].photos[0].thumbnail_url]})
        })
      })
    })
    .catch(err => console.log(err))


  }

  render() {
      var {relatedCardObjs} = this.state;
    return (
      <>
      <div className="title">RELATED PRODUCTS</div>
      <section className="parent">
        {relatedCardObjs.map((card, i) =>
          <div className="card" key={`related-products-${i}`}>
            <div className="card-picture">
              <img src={this.state.relatedStyles[i]}></img>
              <FontAwesomeIcon icon={faStar} className="corner-star" />
            </div>
            <div className="card-description">
              <span className="category">{relatedCardObjs[i].category.toUpperCase()}</span>
              <span className="name">{relatedCardObjs[i].name}</span>
              <span>${relatedCardObjs[i].default_price}</span>
              <span>*****</span>
            </div>
          </div>
        )}
      </section>
      </>
    )
  }
}

export default RelatedProducts;