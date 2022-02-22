import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

import DanModal from './DanModal.jsx';
import ComparisonTable from './ComparisonTable.jsx';
import StarRating from '../sharedComponents/starComponent/StarRating.jsx';
import Carousel from 'react-elastic-carousel';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: this.props.productId, //Get from other component's state
      chosenCardData: [],
      relatedCardIds: [],
      relatedCardObjs: [],
      relatedCardReviews: [],
      relatedStyles: [],
      show: false,
      modalIndex: '',
      hoverIndex: ''
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = (index) => {
    this.setState({ show: true, modalIndex: index });

  };

  hideModal = () => {
    this.setState({ show: false, modalIndex: '' });
  };

  componentDidMount() {
    axios.get(`/api/${this.state.chosenCard}/related`)
      .then(res => {
        this.setState({ relatedCardIds: res.data })
      })
      .then(() => {
        return axios.get(`/api/${this.state.chosenCard}`)
      })
      .then(res => {
        this.setState({chosenCardData: res.data})
      })
      .then(() => {
        let promiseArr = this.state.relatedCardIds.map(id =>
          axios.get(`/api/${id}`)
        )
        Promise.all(promiseArr)
          .then(values => {
            values.forEach(obj => {
              this.setState({ relatedCardObjs: [...this.state.relatedCardObjs, obj.data] })
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
              this.setState({ relatedStyles: [...this.state.relatedStyles, obj.data.results[0].photos[0].thumbnail_url] })
            })
          })
      })
      .then(() => {
        let promiseArr = this.state.relatedCardIds.map(id =>
          axios.get(`/productmeta/${id}`)
        )
        Promise.all(promiseArr)
          .then(values => {
            values.forEach(obj => {
              this.setState({ relatedCardReviews: [...this.state.relatedCardReviews, obj.data.ratings] })
            })
          })
      })
      .catch(err => console.log(err))


  }

  render() {
    var { relatedCardObjs, chosenCardData, modalIndex, hoverIndex } = this.state;
    return (
      <>
        <h3 className="title">RELATED PRODUCTS</h3>
        <section className="parent">
        <Carousel itemsToShow={3}>
          {relatedCardObjs.map((card, i) =>
            <div className="card" key={`related-products-${i}`}>
              <div className="card-picture">
                <img src={this.state.relatedStyles[i]}></img>
                <div className="corner-cover"></div>
                {/* <FontAwesomeIcon icon={ modalIndex === i ? faStarSolid : faStar } className={ modalIndex === i ? "corner-star-full" : "corner-star" } onClick={() => this.showModal(i)}/> */}
                <FontAwesomeIcon icon={ faStar } className={ "corner-star" } onClick={() => this.showModal(i)} onMouseEnter={()=>this.setState({hoverIndex: i})} onMouseLeave={()=>this.setState({hoverIndex: ''})}/>
                <FontAwesomeIcon icon={ faStarSolid } className={ modalIndex === i || hoverIndex === i ? "corner-star corner-star-yellow" : "corner-star corner-star-full"} />
              </div>
              <div className="card-description">
                <span className="category">{relatedCardObjs[i].category.toUpperCase()}</span>
                <span className="name">{relatedCardObjs[i].name}</span>
                <span>${relatedCardObjs[i].default_price}</span>
                <StarRating ratingsObjectOrNumber={this.state.relatedCardReviews[i]} />
              </div>
            </div>
          )}
        </Carousel>
        </section>
        {this.state.modalIndex !== '' &&
        <DanModal show={this.state.show} handleClose={this.hideModal}>
          <ComparisonTable mainItem={chosenCardData} item={relatedCardObjs[this.state.modalIndex]} />
        </DanModal>
        }
      </>
    )
  }
}

export default RelatedProducts;