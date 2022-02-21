import React from 'react';

const ComparisonTable = ({mainItem, item}) => {

  // Features
  var mainItemArr = [];
  var itemArr = [];

  // Values
  var mainItemArrValues = [];
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

  var mainItemArrCopy = mainItemArr.slice();
  var itemArrCopy = itemArr.slice();
  var mainItemArrValuesCopy = mainItemArrValues.slice();
  var itemArrValuesCopy = itemArrValues.slice();

  filteredArray.forEach(feature => {
    mainItemArrCopy.splice(mainItemArrCopy.indexOf(feature), 1);
    mainItemArrValuesCopy.splice(mainItemArrValuesCopy.indexOf(feature), 1);
    itemArrCopy.splice(itemArrCopy.indexOf(feature), 1);
    itemArrValuesCopy.splice(itemArrValuesCopy.indexOf(feature), 1);
  })

  var mainItemObjs = [];
  var itemObjs = [];

  for (let i = 0; i < mainItemArrCopy.length; i++) {
    mainItemObjs.push({feature: mainItemArrCopy[i], value: mainItemArrValuesCopy[i]});
  }

  for (let i = 0; i < itemArrCopy.length; i++) {
    itemObjs.push({feature: itemArrCopy[i], value: itemArrValuesCopy[i]});
  }

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
        {filteredArray.map(filteredFeature =>
            <tr>
              <td>{mainItemArrValues[mainItemArr.indexOf(filteredFeature)]}</td>
              <td>{filteredFeature}</td>
              <td>{itemArrValues[itemArr.indexOf(filteredFeature)]}</td>
          </tr>
          )}
          {mainItemObjs.map(obj =>
            <tr>
              <td>{obj.value}</td>
              <td>{obj.feature}</td>
              <td>n/a</td>
          </tr>
          )}
          {itemObjs.map(obj =>
            <tr>
              <td>n/a</td>
              <td>{obj.feature}</td>
              <td>{obj.value}</td>
          </tr>
          )}
      </tbody>
    </table>
    </>
  );
};

export default ComparisonTable;