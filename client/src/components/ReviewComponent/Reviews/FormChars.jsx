import React, {useState} from 'react';
import css from './FormChars.css';

const FormChars = ({meta}) => {
  const [val, setVal] = useState(3)
  let metaArray = Object.entries(meta.characteristics);

  return metaArray.map(attribute => {
    const id = attribute[1].id;
    return (
      <div className="attribute-container" key={attribute[1].id}>
        <label htmlFor={attribute[0]}>{attribute[0]}</label>
        <div className="attribute-radio">
          <input type="radio" id={id} name={id} data-label="attribute" value={1} />
          <input type="radio" id={id} name={id} data-label="attribute" value={2} />
          <input type="radio" id={id} name={id} data-label="attribute" value={3} />
          <input type="radio" id={id} name={id} data-label="attribute" value={4} />
          <input type="radio" id={id} name={id} data-label="attribute" value={5} />
        </div>
        <div className="attribute-descriptor">
          { (attribute[0] === 'Fit') &&
            <>
              <div className="attribute-left">Too loose</div>
              <div className="attribute-middle">Just right</div>
              <div className="attribute-right">Too tight</div>
            </>
          }
          { (attribute[0] === 'Length') &&
            <>
              <div className="attribute-left">Too short</div>
              <div className="attribute-middle">Just right</div>
              <div className="attribute-right">Too long</div>
            </>
          }
          { (attribute[0] === 'Comfort') &&
            <>
              <div className="attribute-left">Sandpaper</div>
              <div className="attribute-middle">Just right</div>
              <div className="attribute-right">Never taking them off</div>
            </>
          }
          { (attribute[0] === 'Quality') &&
            <>
              <div className="attribute-left">Garbage</div>
              <div className="attribute-middle">OK</div>
              <div className="attribute-right">Great Value</div>
            </>
          }
        </div>
      </div>
      )
  });
};

export default FormChars;