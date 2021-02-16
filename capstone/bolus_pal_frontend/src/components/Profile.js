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
            // highThreshold: '',
            // lowThreshold: '',
            // carbsPerUnit: ''
        }
    }

    // componentDidMount(){
    //     const urls = ["api/high_thresholds", "api/low_thresholds", "api/carbs_per_units"];  
    //     Promise.all(urls.map(url => 
    //         fetch(url)
    //             .then(response => {
    //             if (response.status > 400) {
    //                 return this.setState(() => {
    //                 return { placeholder: "Something went wrong!" };
    //                 });
    //             }
    //             return response.json();
    //             })
    //             ) )
    //             .then(data => {
    //                 this.setState(() => {
    //                     return {
    //                         data,
    //                         loaded: true
    //                     };
    //                 });
    //                 // console.log(data)
    //                 })
    // }

    componentDidMount() {
        fetch("api/users")
            .then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                return { placeholder: "Something went wrong!" };
                });
            }
            return response.json();
            })
            .then(data => {
            this.setState(() => {
                return {
                data,
                loaded: true
                };
            });
            });
        }

    render() {
        return ( 
            <div>
                <h2>Your Settings</h2>
                <UserInfo data={this.state.data} />
            </div>
         );
    }
}
 
export default Profile;