import React from 'react';

const UserInfo = ({highThresholds, lowThresholds, carbsPerUnit}) => {
    return ( 
        <div>
            {/* {highThresholds.high_threshold} */}
            {highThresholds.map(function(number, i) {
                    return (
                        <p key={i}>
                      {number.high_threshold}
                    </p>
                    );
                })}
            {lowThresholds.map(function(number, i) {
                    return (
                        <p key={i}>
                      {number.low_threshold}
                    </p>
                    );
                })}
            {carbsPerUnit.map(function(number, i) {
                    return (
                        <p key={i}>
                      {number.carbsPerUnit}
                    </p>
                    );
                })}   
        </div>
     );
}
 
export default UserInfo;