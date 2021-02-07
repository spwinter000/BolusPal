import React from 'react';

//component for displaying user settings
const UserInfo = ({data}) => {
// const UserInfo = ({highThresholds, lowThresholds, carbsPerUnit}) => {

  function getHighThreshold(arr){
    for (let [key, value] of arr.entries()){
      if (key === 0){
        return value[0].high_threshold
      }
    }
  }

  function getLowThreshold(arr){
    for (let [key, value] of arr.entries()){
      if (key === 1){
        return value[0].low_threshold
      }
    }
  }

  function getCarbsPerUnit(arr){
    for (let [key, value] of arr.entries()){
      if (key === 2){
        return value[0].carbs_per_unit
      }
    }
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