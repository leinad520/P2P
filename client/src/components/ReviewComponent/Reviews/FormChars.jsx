import React, {useState} from 'react';

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
              <div>Too loose</div>
              <div>Just right</div>
              <div>Too tight</div>
            </>
          }
          { (attribute[0] === 'Length') &&
            <>
              <div>Too short</div>
              <div>Just right</div>
              <div>Too long</div>
            </>
          }
          { (attribute[0] === 'Comfort') &&
            <>
              <div>Sandpaper</div>
              <div>Just right</div>
              <div>Never taking them off</div>
            </>
          }
          { (attribute[0] === 'Quality') &&
            <>
              <div>Garbage</div>
              <div>OK</div>
              <div>Great Value</div>
            </>
          }
        </div>
      </div>
      )
  });
};

export default FormChars;