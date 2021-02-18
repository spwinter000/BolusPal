import React, { Component } from 'react';
import NewBolus from './NewBolus';

class BolusList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            handleNewBolus: false,
            addFood: false,
            bolusTotal: 0,
            carbTotal: 0
        }
        // this.getUser = this.getUser.bind(this);
        this.getBoluses = this.getBoluses.bind(this);
        this.convertISODate = this.convertISODate.bind(this);
        this.handleExitNewBolusForm = this.handleExitNewBolusForm.bind(this);
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

    
    // handleNewBolus(){
    //     this._isMounted = true;
    //     // event.preventDefault();
    //     // render new bolus form
    //     return (
    //         <div>
    //             <form className="new-bolus-form">
    //                 <div className="new-bolus-form-inner">
    //                     <button className="btn btn-danger btn-sm" id="new-bolus-button-x" onClick={() => this.setState({handleNewBolus: false, addFood: false})}>X</button>
    //                     <div className="form-group">
    //                         <label id="label">Blood sugar:</label> <input className="form-control" autoFocus type="number" id="input-value"></input> mg/dl<br/>
    //                     </div>
    //                     <div className="form-group">
    //                         <label id="label">Food Items:</label> <a id="new-food" type="submit" onClick={() => this.setState({addFood: true})}>Add Food +</a><br/>
    //                         {this.state.addFood ? this.addFood() : null}
    //                     </div>
    //                     <div className="form-group">
    //                         <label id="label">Carbohydrate total:</label> {this.state.carbTotal} g<br/>
    //                     </div>
    //                     <div className="form-group">
    //                         <label id="label">Bolus Total:</label> {this.state.bolusTotal} units<br/>
    //                     </div>
    //                     <input className="btn btn-primary" type="submit" value="Submit"/>
    //                 </div>
    //             </form>
    //         </div>
    //     )
    // }

    //adding food to food list in new bolus form
    // addFood(){
    //     return(
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Food Item</th>
    //                     <th>Carbohydrates</th>
    //                     <th>Servings</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td><input className="form-control" autoFocus type="text" id="input-value-2"/></td>
    //                     <td><input className="form-control" autoFocus type="number" id="input-value-2"/></td>
    //                     <td><input className="form-control" autoFocus type="number" id="input-value-2"/></td>
    //                     <td><button className="btn btn-primary" id="new-food-button">Add</button></td>
    //                 </tr>
    //             </tbody>
    //         </table>
    //     )
    // }

    // submit new bolus to db, render on page
    submitNewBolus(){
    }

    // retrieve list of boluses from api
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
                )};
            });
        }
        
        
    // convert python ISO datetime to readable string
    convertISODate(UNIXstring){
        // let date1 = new Date(UNIXstring).toLocaleDateString();
        let date = new Date(UNIXstring).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
        return date;
    }

    // close out of new bolus form
    handleExitNewBolusForm(event){
        event.preventDefault();
        this.setState({handleNewBolus: false});
    }

    componentDidMount(){
        this._isMounted = true;
        this.getBoluses();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        console.log(this.state.data)
        return (
            <div className="">
                <h2 className="title">Your Boluses</h2>
                <button className="btn btn-primary" id="new-bolus" onClick={() => this.setState({handleNewBolus: true})}>Add New Bolus</button>
                <hr></hr>
                {/* {this.state.handleNewBolus ? this.handleNewBolus() : null} */}
                {this.state.handleNewBolus ? <NewBolus handleExitNewBolusForm={this.handleExitNewBolusForm}/> : null}
            <ul>
            {this.state.data.map((item, i) => (
                <div className="bolus-outer" key={i}>
                    <div className="bolus-inner">
                        <p id="label">Carbohydrate total:</p> <p id="value">{item.carb_total}g</p> <br/>
                        <p id="label">Blood sugar:</p> <p id="value">{item.blood_sugar}mg/dl</p> <br/>
                        <p id="label">Bolus Total:</p> <p id="value">{item.bolus_total} units</p><br/>
                        <p id="timestamp">{this.convertISODate.call(this, item.timestamp)}</p>
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