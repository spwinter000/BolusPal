import React from 'react';

//component for displaying user settings
const UserInfo = ({data}) => {
// const UserInfo = ({highThresholds, lowThresholds, carbsPerUnit}) => {

  // function getHighThreshold(arr){
  //   for (let [key, value] of arr.entries()){
  //     if (key === 0){
  //       return value[0].high_threshold
  //     }
  //   }
  // }

  // function getLowThreshold(arr){
  //   for (let [key, value] of arr.entries()){
  //     if (key === 1){
  //       return value[0].low_threshold
  //     }
  //   }
  // }

  // function getCarbsPerUnit(arr){
  //   for (let [key, value] of arr.entries()){
  //     if (key === 2){
  //       return value[0].carbs_per_unit
  //     }
  //   }
  // }
console.log(data)
    return (
      <div className="settings-div-outer">
        <div className="settings-div-inner">
          {data.map(function(user, i) {
                  return (
                      <li key={i}>
                  - User: {user.username}<br/> 
                  - Low threshold: {user.high_threshold} <br/>
                  - High threshold: {user.low_threshold} <br/>
                  - Carbs per unit: {user.carbs_per_unit} <br/>
                  </li>
                  );
              })}

            {/* <p>High Threshold: {getHighThreshold(data)}mg/dl</p>
            <p>Low Threshold: {getLowThreshold(data)}mg/dl</p>
            <p>Carbs per unit: {getCarbsPerUnit(data)}g</p> */}
        </div>
      </div>
     );
}
 
export default UserInfo;