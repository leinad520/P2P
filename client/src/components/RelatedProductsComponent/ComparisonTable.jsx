import React from 'react';

const ComparisonTable = ({mainItem, item}) => {

  var mainItemArr = [];
  var mainItemArrValues = [];
  var itemArr = [];
  var itemArrValues = [];

  mainItem.features.forEach(obj => {
    mainItemArr.push(obj.feature);
    mainItemArrValues.push(obj.value)
  })

  item.features.forEach(obj => {
    itemArr.push(obj.feature);
    itemArrValues.push(obj.value)

  })

  const filteredArray = mainItemArr.filter(feature => itemArr.includes(feature));

  return (
    <>
    <h2>Comparing</h2>
    <br></br>

    <table>
    <tbody>
        <tr>
          <th>{mainItem.name}</th>
          <th>Characteristic</th>
          <th>{item.name}</th>
        </tr>
        <tr>
          <td>{mainItem.category}</td>
          <td>Category</td>
          <td>{item.category}</td>
        </tr>
        <tr>
          <td>${mainItem.default_price}</td>
          <td>Price</td>
          <td>${item.default_price}</td>
        </tr>
        <tr>
          <td>{mainItem.slogan}</td>
          <td>Slogan</td>
          <td>{item.slogan}</td>
        </tr>
        {filteredArray.map(filteredFeature =>
            <tr>
              <td>{mainItemArrValues[mainItemArr.indexOf(filteredFeature)]}</td>
              <td>{filteredFeature}</td>
              <td>{itemArrValues[itemArr.indexOf(filteredFeature)]}</td>
          </tr>
          )}
        {mainItem.features.map(feature =>
            <tr>
              <td>{feature.value}</td>
              <td>{feature.feature}</td>
              <td>n/a</td>
          </tr>
          )}
        {item.features.map(feature =>
            <tr>
              <td>n/a</td>
              <td>{feature.feature}</td>
              <td>{feature.value}</td>
          </tr>
          )}
      </tbody>
    </table>
    </>
  );
};

export default ComparisonTable;