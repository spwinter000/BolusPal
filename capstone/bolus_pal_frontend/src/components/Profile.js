import React, { Component } from 'react';
import UserInfo from './UserInfo';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
            // // test: 'hiiiiiiisfsf',
            // loaded: false,
            // placeholder: "Loading"
        }
    }

    // componentDidMount() {
    // fetch("api/high_thresholds")
    //     .then(response => {
    //     if (response.status > 400) {
    //         return this.setState(() => {
    //         return { placeholder: "Something went wrong!" };
    //         });
    //     }
    //     return response.json();
    //     })
    //     .then(data => {
    //     this.setState(() => {
    //         return {
    //         data,
    //         loaded: true
    //         };
    //     });
    //     });
    // }

    // componentDidMount(){
    //     try {
    //         let [high_thresholds, low_thresholds, carbs_per_unit] = await Promise.all([
    //           fetch("api/high_thresholds"),
    //           fetch("api/low_thresholds"),
    //           fetch("api/carbs_per_unit")
    //         ]);
          
    //        return(
    //           <UserInfo highThresholds={high_thresholds} lowThresholds={low_thresholds} carbsPerUnit={carbs_per_unit} />
    //         );
    //       }
    //       catch(err) {
    //         console.log(err);
    //       };
    // }

    componentDidMount(){
        Promise.all([
              fetch("api/high_thresholds"),
              fetch("api/low_thresholds"),
              fetch("api/carbs_per_unit")
            ]).then(responseList => {
                let high_thresholds = responseList[0]
                let low_thresholds = responseList[1]
                let carbs_per_unit = responseList[2]
                return(
              <UserInfo highThresholds={high_thresholds} lowThresholds={low_thresholds} carbsPerUnit={carbs_per_unit} />
            );
          })
        //   .catch(err) {
        //     console.log(err);
        //   };
        }




    render() { 
        return ( 
            <div>
                <UserInfo highThresholds={high_thresholds} lowThresholds={low_thresholds} carbsPerUnit={carbs_per_unit} />
            </div>
         );
    }
}
 
export default Profile;