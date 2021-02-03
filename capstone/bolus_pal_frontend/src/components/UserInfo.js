import React from 'react';

//component for displaying user settings
const UserInfo = ({data}) => {
// const UserInfo = ({highThresholds, lowThresholds, carbsPerUnit}) => {

  function getHighThreshold(arr){
    const map = arr.map(element => 
      element[0].high_threshold)
    return map
  }

  function getLowThreshold(arr){
    const map = arr.map(element => 
      element[0].low_threshold)
    return map
  }

  function getCarbsPerUnit(arr){
    const map = arr.map(element => 
      element[0].carbs_per_unit)
    return map
  }

    return ( 
      <div className="settings-div-outer">
        <div className="settings-div-inner">
            <p>High Threshold: {getHighThreshold(data)}mg/dl</p>
            <p>Low Threshold: {getLowThreshold(data)}mg/dl</p>
            <p>Carbs per unit: {getCarbsPerUnit(data)}g</p>
        </div>
      </div>
     );
}
 
export default UserInfo;