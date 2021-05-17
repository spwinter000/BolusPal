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
            highThreshold: '',
            lowThreshold: '',
            carbsPerUnit: ''
        }
        this._isMounted = false;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    fetchUserInfo(){
        axiosInstance.get(`api/userinfos/`)
        .then(result => {
            console.log(result.data)
            let newArr = [];
            for (let user of result.data){
                if (user.user === this.props.loggedInID){
                    newArr.push(user);
                }
            }
            if(this._isMounted) {
                this.setState({
                    userInfo: newArr,
                }
                , () => console.log(this.state.userInfo)
                );
            }    
        })
    }

    saveInfo(low, high, carbs){
        axiosInstance.put(`api/userinfos/${this.state.userInfo[0].id}/`, {
            user: this.props.loggedInID,
            low_threshold: parseInt(low),
            high_threshold: parseInt(high),
            carbs_per_unit: parseInt(carbs) 
        }).then(result => { 
            if (result){
                this.setState({
                    edit: true,
                    highThreshold: high,
                    lowThreshold: low,
                    carbsPerUnit: carbs
                })
            }
        })          
        .catch(error => {
            throw error;
        });
    }

    
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchUserInfo();
    }

    render() {
        return ( 
            <div>
                <h2 className="title">Your Settings</h2>
                <hr/>
                <div className="settings-div-outer">
                    <div className="settings-div-middle">
                            {this.state.userInfo.map((item) => (
                                <div className="user-specs" key={item.id}>
                                        {this.state.edit ?
                                        <div className="user-specs-inner">
                                            <p key={'1'} id="spec-label">Low threshold: </p>  
                                            <div key={item.low_threshold} className="input">
                                                <p id="spec">{item.low_threshold}mg/dl</p>
                                            </div>

                                            <p key={'2'} id="spec-label">High threshold: </p>  
                                            <div key={item.high_threshold} className="input">
                                                <p id="spec">{item.high_threshold}mg/dl</p>
                                            </div>

                                            <p key={'3'} id="spec-label">Carbs per unit: </p>  
                                            <div key={item.carbs_per_unit} className="input">
                                                <p id="spec">{item.carbs_per_unit}mg/dl</p>
                                            </div>

                                            <button key={'button'} className="btn btn-primary" onClick={() => { this.setState({edit: !this.state.edit, lowThreshold: item.low_threshold, highThreshold: item.high_threshold, carbsPerUnit: item.carbs_per_unit}), (e) => this.editInfo.bind(this, e, item.carbs_per_unit) }} id="edit-button">Update Information</button>
                                        </div>
                                        :
                                        <div className="user-specs-inner">
                                            <form className="spec-form" onSubmit={() => this.saveInfo(this.state.lowThreshold, this.state.highThreshold, this.state.carbsPerUnit)}>
                                                <p key={'1'} id="spec-label">Low threshold: </p>  
                                                <div key={item.low_threshold} className="input">
                                                    <p id="spec"><input type="number" name="lowThreshold" onChange={this.handleChange} value={this.state.lowThreshold}/> mg/dl </p>
                                                </div>

                                                <p key={'2'} id="spec-label">High threshold: </p>  
                                                <div key={item.high_threshold} className="input">
                                                    <p id="spec"><input type="number" name="highThreshold" onChange={this.handleChange} value={this.state.highThreshold}/> mg/dl </p>
                                                </div>

                                                <p key={'3'} id="spec-label">Carbs per unit: </p>  
                                                <div key={item.carbs_per_unit} className="input">
                                                    <p id="spec"><input type="number" name="carbsPerUnit" onChange={this.handleChange} value={this.state.carbsPerUnit}/> mg/dl </p>
                                                </div>

                                                <button key={'button'} className="btn btn-primary" id="edit-button">Save Information</button>
                                            </form>
                                        </div>
                                        }
                                </div>
                            ))}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Profile;