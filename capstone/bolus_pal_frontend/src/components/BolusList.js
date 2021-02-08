import React, { Component } from 'react';

class BolusList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
    }

    handleNewBolus(event){
        event.preventDefault();

    }

    componentDidMount() {
        fetch("api/boluses")
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

        render() {
            return (
            <div>
                <h2>Your Boluses</h2>
                <button onClick={this.handleNewBolus}>Add New Bolus</button>
            <ul>
            {this.state.data.map(function(item, i) {
                return (
                    <li key={i}>
                {item.user} 
                - Low threshold: {item.high_threshold} <br/>
                - High threshold: {item.low_threshold} <br/>
                - Carbs per unit: {item.carbs_per_unit} <br/>
                - Carbohydrate total: {item.carb_total} <br/>
                - Blood sugar: {item.blood_sugar}mg/dl <br/>
                - Bolus Total: {item.bolus_total}<br/>
                </li>
                );
            })}
            </ul>
            </div>
        );
    }
    
}

export default BolusList;