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
                <h1>Your Boluses</h1>
                <button onClick={this.handleNewBolus}>Add New Bolus</button>
            <ul>
            {this.state.data.map(function(item, i) {
                return (
                    <li key={i}>
                {item.user} - {item.high_threshold} - {item.low_threshold} - {item.carbs_per_unit} 
                - {item.carb_total} - {item.blood_sugar} - {item.bolus_total}
                </li>
                );
            })}
            </ul>
            </div>
        );
    }
    
}

export default BolusList;