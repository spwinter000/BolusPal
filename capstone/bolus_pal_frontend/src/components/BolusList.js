import React, { Component } from 'react';

class BolusList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            handleNewBolus: false
        }
        // this.getUser = this.getUser.bind(this);
        this.getBoluses = this.getBoluses.bind(this);
        this.convertISODate = this.convertISODate.bind(this);
        this._isMounted = false;
    }

    // get the user from user model that is associated with the bolus user
    // getUser() {
    //     fetch(`api/users/${this.props.loggedInID}`)
    //     .then(response => {
    //         if (response.status > 400) {
    //             return this.setState(() => {
    //                 return { placeholder: "Something went wrong!" };
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         this.setState(() => {
    //             return {
    //                 data,
    //                 loaded: true
    //             };
    //         });
    //         console.log(data)
    //     });
    // }

    
    handleNewBolus(){
        this._isMounted = true;
        // event.preventDefault();
        // render new form submit new bolus to db
        return (
            <div>
                <form className="new-bolus-form">
                    <label id="label">Carbohydrate total:</label> <input id="value"></input>g<br/>
                    <label id="label">Blood sugar:</label> <input id="value"></input>mg/dl<br/>
                    <label id="label">Bolus Total:</label> <input id="value"></input>units<br/>
                </form>
            </div>
        )
    }

    getBoluses(){
        this._isMounted = true;
        fetch(`api/boluses/`)
        .then(response => {
            if (response.status > 400) {
                return this.setState({ placeholder: "Something went wrong!" });
            }
            return response.json();
        })
        .then(data => {
            // console.log(data)
            let newArr = [];
            for (let bolus of data){
                if (bolus.user === this.props.loggedInID){
                    newArr.push(bolus)
                }
            }
            if(this._isMounted) {
                this.setState({
                    data: newArr,
                    loaded: true
                }
            // console.log(newArr)
            )};
        });
    }

    // convert python ISO datetime to readable string
    convertISODate(UNIXstring){
        // let date1 = new Date(UNIXstring).toLocaleDateString();
        let date = new Date(UNIXstring).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
        return date;
    }

    componentDidMount(){
        this._isMounted = true;
        this.getBoluses();
    }

    componentWillUnmount() {
        this._isMounted = false;
     }
    
    render() {
        return (
            <div>
                <h2 className="title">Your Boluses</h2>
                <button className="new-bolus" onClick={() => this.setState({handleNewBolus: true})}>Add New Bolus</button>
            <ul>
            {this.state.data.map((item, i) => (
                <div className="bolus-outer" key={i}>
                    <div className="bolus-inner">
                        <p id="label">Carbohydrate total:</p> <p id="value">{item.carb_total}g</p> <br/>
                        <p id="label">Blood sugar:</p> <p id="value">{item.blood_sugar}mg/dl</p> <br/>
                        <p id="label">Bolus Total:</p> <p id="value">{item.bolus_total} units</p><br/>
                        {this.convertISODate.call(this, item.timestamp)}<br/>
                    </div>
                </div>
                )
            )}
            </ul>
            </div>
        );
    }
    
}

export default BolusList;