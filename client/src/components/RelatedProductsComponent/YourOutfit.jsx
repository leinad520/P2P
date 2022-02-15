import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'


class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: 42367, //Get from other component's state
      outfitCardIds: Array(4).fill(null),
      relatedCardObjs: Array(4).fill(null),
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

      let cards =
      <section className="parent">
        {this.state.outfitCardIds.map((card, i) =>
          <div className="outfit-card" onClick={() => this.setState( {outfitCardIds: [this.state.chosenCard]} )}>
            <h3>Add to Outfit</h3>
            <div className="empty-card">
              <FontAwesomeIcon icon={faCirclePlus} className="circle-plus" size='5x' />
            </div>
          </div>
        )}
      </section>



    return (
    <>
      <div className="title">YOUR OUTFIT</div>
      {this.state.outfitCardIds[0] === null ? cards :
        <section className="parent">
          {relatedCardObjs.map((card, i) =>
            <div className="card">
              <div className="card-picture">
                <img src={this.state.relatedStyles[i]}></img>
                <FontAwesomeIcon icon={faCircleXmark} className="corner-xmark" />
              </div>
              <div className="card-description">
                <span>{relatedCardObjs[i].category}</span>
                <span>{relatedCardObjs[i].name}</span>
                <span>${relatedCardObjs[i].default_price}</span>
                <span>*****</span>
              </div>
            </div>
          )}
        </section>
      }
    </>

    )
  }
}

export default YourOutfit;