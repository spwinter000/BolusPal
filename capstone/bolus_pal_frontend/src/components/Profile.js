import React, { Component } from 'react';
import UserInfo from './UserInfo';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            // // test: 'hiiiiiiisfsf',
            loaded: false,
            placeholder: "Loading",
            highThreshold: '',
            lowThreshold: '',
            carbsPerUnit: ''
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
        const urls = ["api/high_thresholds", "api/low_thresholds", "api/carbs_per_units"];  
        Promise.all(urls.map(url => 
            fetch(url)
                .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                    return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
                })
                ) )
                .then(data => {
                    this.setState(() => {
                        return {
                            data,
                            loaded: true
                        };
                    });
                    // console.log(data)
                    })
    }

    //           fetch("api/high_thresholds"),
    //           fetch("api/low_thresholds"),
    //           fetch("api/carbs_per_unit")
    //         ]).then(responseList => {
    //             let high_thresholds = responseList[0]
    //             let low_thresholds = responseList[1]
    //             let carbs_per_unit = responseList[2]
    //             return(
    //           <UserInfo highThresholds={high_thresholds} lowThresholds={low_thresholds} carbsPerUnit={carbs_per_unit} />
    //         );
    //       })
    //     //   .catch(err) {
    //     //     console.log(err);
    //     //   };
    //     }

    // componentDidUpdate(){
    //     let high_threshold = '';
    //     let low_threshold = '';
    //     let carbs_per_unit = '';
    //     console.log(this.state.data)
    //     for (let arr of this.state.data){
    //         high_threshold = arr[0].high_threshold;
    //         low_threshold = arr[0].low_threshold;
    //         carbs_per_unit = arr[0].carbs_per_unit;
    //         // console.log(arr[0].high_threshold)
    //         // console.log(arr[1].low_threshold)
    //         // console.log(arr[2].carbs_per_unit)
    //         // console.log(arr)
    //         // console.log(high_threshold, low_threshold, carbs_per_unit)
    //     }
    // }


    render() {
        // let high_threshold = '';
        // let low_threshold = '';
        // let carbs_per_unit = '';
        // console.log(this.state.data)
        // // this.state.data.map(x => x.high_threshold)
        // for (let arr of this.state.data){
        //     for (let arr2 of arr){
        //         high_threshold = arr2.high_threshold;
        //         low_threshold = arr2.low_threshold;
        //         carbs_per_unit = arr2.carbs_per_unit;
        //     }
        //     console.log(arr)
        //     // console.log(high_threshold, low_threshold, carbs_per_unit)
        //     // console.log(this.state.data[0])
        // }
        return ( 
            <div>
                <UserInfo data={this.state.data} />
                {/* <UserInfo highThresholds={high_thresholds} lowThresholds={low_thresholds} carbsPerUnit={carbs_per_unit} /> */}
                {/* <h1>Your settings:</h1>
                <ul>
                <p>High Threshold: {high_threshold}</p>
                <p>Low Threshold: {low_threshold}</p>
                <p>Carbs per unit: {carbs_per_unit}g</p>
                {this.state.data.map(function(item, i) {
                    return (
                        <li key={i}>
                            {item.high_threshold}
                        </li>
                    );
                })}
                </ul> */}
            </div>
         );
    }
}
 
export default Profile;