import React, { Component } from 'react';

class BolusList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.getUser = this.getUser.bind(this);
        this.getBoluses = this.getBoluses.bind(this);
    }

    handleNewBolus(event){
        event.preventDefault();
    }

    // get the user from user model that is associated with the bolus user
    getUser() {
        fetch(`api/users/${this.props.loggedInID}`)
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
            console.log(data)
        });
    }

    getBoluses(){
        fetch(`api/boluses/`)
        .then(response => {
            if (response.status > 400) {
                return this.setState({ placeholder: "Something went wrong!" });
            }
            return response.json();
        })
        .then(data => {
            let newArr = [];
            for (let bolus of data){
                if (bolus.user === `http://127.0.0.1:8000/api/users/${this.props.loggedInID}/`){
                    newArr.push(bolus)
                }
            }
            this.setState({
                data: newArr,
                loaded: true
            },
            console.log(newArr)
            );
        });
    }

    
    componentDidMount(){
        // this.getUser();
        this.getBoluses();
    }
    
    render() {
        return (
            <div>
                <h2>Your Boluses</h2>
                <button onClick={this.handleNewBolus}>Add New Bolus</button>
            <ul>
            {this.state.data.map(function(item, i) {
                return (
                <div key={i} className="bolus">
                - Carbohydrate total: {item.carb_total} <br/>
                - Blood sugar: {item.blood_sugar}mg/dl <br/>
                - Bolus Total: {item.bolus_total}<br/>
                - Timestamp: {item.timestamp}<br/>
                </div>
                );
            })}
            </ul>
            </div>
        );
    }
    
}

export default BolusList;