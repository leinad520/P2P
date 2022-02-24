import React, {useState} from 'react';
import css from './FormChars.css';

const FormChars = ({meta}) => {
  const [val, setVal] = useState(3)
  let metaArray = Object.entries(meta.characteristics);

  return metaArray.map(attribute => {
    const id = attribute[1].id;

    const attribs = {}

    if (attribute[0] === 'Fit') {
      attribs.one = 'Too tight';
      attribs.two = 'Somewhat tight';
      attribs.three = 'Perfect';
      attribs.four = 'Somewhat loose';
      attribs.five = 'Too loose';
    } else if (attribute[0] === 'Length') {
      attribs.one = 'Too short';
      attribs.two = 'Somewhat short';
      attribs.three = 'Perfect';
      attribs.four = 'Somewhat long';
      attribs.five = 'Too long';
    } else if (attribute[0] === 'Comfort') {
      attribs.one = 'Not comfy';
      attribs.two = 'Comfy-ish';
      attribs.three = 'Comfy';
      attribs.four = 'Very comfy';
      attribs.five = 'My lord';
    }  else if (attribute[0] === 'Quality') {
      attribs.one = 'Poor';
      attribs.two = 'OK';
      attribs.three = 'Solid';
      attribs.four = 'Great';
      attribs.five = 'Amazing';
    } else if (attribute[0] === 'Size') {
      attribs.one = 'Poor';
      attribs.two = 'OK';
      attribs.three = 'Solid';
      attribs.four = 'Great';
      attribs.five = 'Amazing';
    } else if (attribute[0] === 'Width') {
      attribs.one = 'Poor';
      attribs.two = 'OK';
      attribs.three = 'Solid';
      attribs.four = 'Great';
      attribs.five = 'Amazing';
    }

    return (
      <div className="attribute-container" key={attribute[1].id}>
        <label className="radio-label" htmlFor={attribute[0]}>{attribute[0]}</label>

          <div className="attribute-group">
            <input className="radio-form-button" type="radio" id={id} name={id} data-label="attribute" value={1} />
            <div>{attribs.one}</div>
          </div>

          <div className="attribute-group">
            <input className="radio-form-button" type="radio" id={id} name={id} data-label="attribute" value={2} />
            <div>{attribs.two}</div>
          </div>

          <div className="attribute-group">
            <input className="radio-form-button" type="radio" id={id} name={id} data-label="attribute" value={3} />
            <div>{attribs.three}</div>
          </div>

          <div className="attribute-group">
            <input className="radio-form-button" type="radio" id={id} name={id} data-label="attribute" value={4} />
            <div>{attribs.four}</div>
          </div>

          <div className="attribute-group">
            <input className="radio-form-button" type="radio" id={id} name={id} data-label="attribute" value={5} />
            <div>{attribs.five}</div>
          </div>

      </div>
      )
  });
};

export default FormChars;