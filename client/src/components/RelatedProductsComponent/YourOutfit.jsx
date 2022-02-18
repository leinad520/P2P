import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'


class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: 42366, //Get from other component's state
      outfitCardIds: Array(4).fill(null), // [42367, null, null, null]
      outfitCardObjs: Array(4).fill(null), // [{}, null, null, null]
      styles: []
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
    });
  }

  addOutfit(index) {
    if (!this.state.outfitCardIds.includes(this.state.chosenCard)) {
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

  render() {
      var {outfitCardObjs, styles} = this.state;

    return (
    <>
      <div className="title">YOUR OUTFIT</div>
        <section className="parent">
          {outfitCardObjs.map((card, i) => card === null ?
            //empty outfit card
            <div className="outfit-card" key={`your-outfit-${i}`}>
              <h3>Add to Outfit</h3>
              <div className="empty-card" onClick={() => this.addOutfit(i)}>
                <FontAwesomeIcon icon={faCirclePlus} className="circle-plus" size='5x' />
              </div>
            </div>
            :
            //filled outfit card
            <div className="card" key={`your-outfit-${i}`}>
              <div className="card-picture">
                <img src={styles[i] ? styles[i].data.results[0].photos[0].thumbnail_url : null }></img>
                <FontAwesomeIcon icon={faCircleXmark} className="corner-xmark" onClick={() => this.deleteOutfit(i)} />
              </div>
              <div className="card-description">
                <span className="category">{outfitCardObjs[i].data.category.toUpperCase()}</span>
                <span className="name">{outfitCardObjs[i].data.name}</span>
                <span>${outfitCardObjs[i].data.default_price}</span>
                <span>*****</span>
              </div>
            </div>
          )}
        </section>
    </>

    )
  }
}

export default YourOutfit;