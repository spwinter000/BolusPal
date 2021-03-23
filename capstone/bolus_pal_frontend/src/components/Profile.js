import React, { Component } from 'react';
import { getCookie } from './../getCookie';
import axiosInstance from './../AxiosApi';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo: [],
            loaded: false,
            placeholder: "Loading",
            edit: true,
            // editInfo: {},
            highThreshold: '',
            lowThreshold: '',
            carbsPerUnit: ''
        }
        this._isMounted = false;
        this.handleChange = this.handleChange.bind(this);
        // this.editInfo = this.editInfo.bind(this);
        // this.keyCount = 0;
        // this.getKey = this.getKey.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    fetchUser(){
        axiosInstance.get(`api/users/${this.props.loggedInID}`)
            // headers: {
            //     'Authorization': "JWT " + localStorage.getItem('access_token')
            //     }
        // })
        .then(result => {
            // axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
            console.log(result)
            let newArr = [];
            newArr.push(result.data);
            if(this._isMounted) {
                this.setState({
                    userInfo: newArr,
                    // highThreshold: userInfo.low_threshold,
                    // lowThreshold: userInfo.high_threshold,
                    // carbsPerUnit: userInfo.carbs_per_unit
                }
                // , () => console.log(this.state.userInfo)
                );
            }    
        })
        // .then(userInfo => {
        // });
    }

    // getKey(){
    //     return this.keyCount++;
    // }

    // editInfo(event, id){
    //     event.preventDefault();

    //     // send 

    //     console.log('method activated')

    //     this.setState({
    //         editInfo: {
    //             ...this.state.editInfo,
    //             [id]: !this.state.editInfo[id],
    //         }
    //     });
    // }

    saveInfo(event, low, high, carbs){
        // console.log('function called');
        event.preventDefault();
        axiosInstance.put(`api/users/${this.props.loggedInID}/`, {
            email: this.state.userInfo[0].email,
            username: this.state.userInfo[0].username,
            // "password": "scott",
            low_threshold: parseInt(low),
            high_threshold: parseInt(high),
            carbs_per_unit: parseInt(carbs) 
        })           
        // , {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': "JWT " + localStorage.getItem('access_token'),
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json, */*',
        //         'X-CSRFToken': getCookie('csrftoken')
        //     },
            // body: JSON.stringify({
            // })
        // })
        // .then(response => response.json())
        .catch(error => {
            throw error;
        });
    }

    
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        this.fetchUser();
    }

    render() {
        return ( 
            <div>
                <h2 className="title">Your Settings</h2>
                <div className="settings-div-outer">
                    <div className="settings-div-inner">
                    {this.state.userInfo.map((item) => (
                        <div className="user-specs" key={item.id}>
                                {this.state.edit ?
                                <div>
                                    {/* <p>User: {item.username}</p> */}
                                    <p key={'1'}>Low threshold: </p>  
                                    <div key={item.low_threshold} className="input">
                                        <p>{item.low_threshold}mg/dl</p>
                                    </div>

                                    <p key={'2'}>High threshold: </p>  
                                    <div key={item.high_threshold} className="input">
                                        <p>{item.high_threshold}mg/dl</p>
                                    </div>

                                    <p key={'3'}>Carbs per unit: </p>  
                                    <div key={item.carbs_per_unit} className="input">
                                        <p>{item.carbs_per_unit}mg/dl</p>
                                    </div>

                                    <button key={'button'} className="btn btn-primary" onClick={() => { this.setState({edit: !this.state.edit, lowThreshold: item.low_threshold, highThreshold: item.high_threshold, carbsPerUnit: item.carbs_per_unit}), (e) => this.editInfo.bind(this, e, item.carbs_per_unit) }} id="edit-button">Update Information</button>
                                </div>
                                :
                                <div>
                                    <form onSubmit={(e) => this.saveInfo(e, this.state.lowThreshold, this.state.highThreshold, this.state.carbsPerUnit)}>
                                        {/* <p>User: {item.username}</p> */}
                                        <p key={'1'}>Low threshold: </p>  
                                        <div key={item.low_threshold} className="input">
                                            <p><input type="number" name="lowThreshold" onChange={this.handleChange} value={this.state.lowThreshold}/> mg/dl </p>
                                        </div>

                                        <p key={'2'}>High threshold: </p>  
                                        <div key={item.high_threshold} className="input">
                                            <p><input type="number" name="highThreshold" onChange={this.handleChange} value={this.state.highThreshold}/> mg/dl </p>
                                        </div>

                                        <p key={'3'}>Carbs per unit: </p>  
                                        <div key={item.carbs_per_unit} className="input">
                                            <p><input type="number" name="carbsPerUnit" onChange={this.handleChange} value={this.state.carbsPerUnit}/> mg/dl </p>
                                        </div>

                                        <button key={'button'} className="btn btn-primary" id="edit-button">Save Information</button>
                                    </form>
                                </div>

                                // (e) => this.saveInfo(e, item.low_threshold, item.high_threshold, item.carbs_per_unit)

                                }
                        </div>
                        ))}
                    </div>
                </div>
                {/* <UserInfo userInfo={this.state.userInfo} /> */}
            </div>
         );
    }
}
 
export default Profile;