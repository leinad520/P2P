import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../sharedComponents/starComponent/StarRating.jsx';



class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: this.props.productId, //Get from other component's state
      outfitCardIds: JSON.parse(localStorage.getItem("outfitCardIds")) || Array(4).fill(null), // [42367, null, null, null]
      outfitCardObjs: JSON.parse(localStorage.getItem("outfitCardObjs")) || Array(4).fill(null), // [{}, null, null, null]
      styles: JSON.parse(localStorage.getItem("styles")) || [], // thumbnail image urls
      starReviews: JSON.parse(localStorage.getItem("starReviews")) || [] // star component
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
  }

  setOutfitCardsHelper(outfitCardIdsCopy) {
    this.setState({ outfitCardIds: outfitCardIdsCopy }, () => {
    let promiseArr = this.state.outfitCardIds.map(id =>
      id === null ? null : axios.get(`/products/${id}/styles`)
    )
    Promise.all(promiseArr)
    .then(values => {
      this.setState({ styles: values })
    })
    .then(() => {
      let promiseArr = this.state.outfitCardIds.map(id =>
        id === null ? null : axios.get(`/api/${id}`)
      )
      Promise.all(promiseArr)
      .then(values => {
        this.setState({ outfitCardObjs: values })
      })
    })
    .then(() => {
      let promiseArr = this.state.outfitCardIds.map(id =>
        id === null ? null : axios.get(`/productmeta/${id}`)
      )
      Promise.all(promiseArr)
        .then(values => {
            this.setState({ starReviews: values })
        })
      })
    });
  }

  addOutfit(index) {
    if (this.state.outfitCardIds.includes(this.state.chosenCard)) {
      alert(`You have already added this item to your outfits`);
    } else {
      let outfitCardIdsCopy = this.state.outfitCardIds.slice();
      outfitCardIdsCopy[index] = this.state.chosenCard;

      this.setOutfitCardsHelper(outfitCardIdsCopy);
    }
  }

  deleteOutfit(index) {
    let outfitCardIdsCopy = this.state.outfitCardIds.slice();
    outfitCardIdsCopy[index] = null;

    this.setOutfitCardsHelper(outfitCardIdsCopy);
  }

  componentDidUpdate() {
    localStorage.setItem("outfitCardObjs", JSON.stringify(this.state.outfitCardObjs));
    localStorage.setItem("outfitCardIds", JSON.stringify(this.state.outfitCardIds));
    localStorage.setItem("styles", JSON.stringify(this.state.styles));
    localStorage.setItem("starReviews", JSON.stringify(this.state.starReviews));
  }

  render() {
      var {outfitCardObjs, styles, starReviews} = this.state;

    return (
    <>
      <h3 className="title">YOUR OUTFIT</h3>
        <section className="parent">
          {outfitCardObjs.map((card, i) => card === null ?
            //empty outfit card
            <div className="outfit-card" key={`your-outfit-${i}`} onClick={() => this.addOutfit(i)}>
              <h3>Add to Outfit</h3>
              <FontAwesomeIcon icon={faCirclePlus} className="circle-plus" size='5x' />
            </div>
            :
            //filled outfit card
            <div className="card" key={`your-outfit-${i}`} >
              <div className="card-picture">
                <img src={styles[i] ? styles[i].data.results[0].photos[0].thumbnail_url : null }></img>
                <FontAwesomeIcon icon={faCircleXmark} className="corner-xmark" onClick={() => this.deleteOutfit(i)} />
              </div>
              <div className="card-description">
                <span className="category">{outfitCardObjs[i].data.category.toUpperCase()}</span>
                <span className="name">{outfitCardObjs[i].data.name}</span>
                <span>${outfitCardObjs[i].data.default_price}</span>
                <StarRating ratingsObjectOrNumber={starReviews[i] ? starReviews[i].data.ratings : null} />
              </div>
            </div>
          )}
        </section>
    </>

    )
  }
}

export default YourOutfit;