import React, { Component }from 'react';
import { getCookie } from './../getCookie';
import axiosInstance from './../AxiosApi';
// import numberRollup from "number-rollup";

// import NewBolus from './NewBolus';

class NewBolus extends Component {
    constructor(props){
        super(props);
        this.state = {
            addFood: false,
            addFoodLabel: 'Add Food (+)',
            errors: '',
            userInfo: [],
            latestBolus: '',
            bolusTitle: '',
            foodName: '',
            carbs: 0,
            servings: 1,
            foodAdded: [],
            bloodSugar: '',
            carbTotal: 0,
            bolusTotal: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        // this.fetchUserInfo = this.fetchUser.bind(this);
        this.addFoodToForm = this.addFoodToForm.bind(this);
        this.newBolusAndBolusID = this.newBolusAndBolusID.bind(this);
    }

    // go into state and find name from target element and set that property's value to target element value
    handleChange(event){
        this.setState({[event.target.name]: event.target.value}, () => this.validateBloodSugar());
    }

    // show warning if bloodsugar is too high, else leave errors blank
    validateBloodSugar(){
        if (this.state.bloodSugar > 300) {
            this.setState({errors: 'Blood sugar is over 300. Consider bolusing and waiting 15 minutes before eating.'}, () => this.incrementBolus())
        }
        else {
            this.setState({errors: ''}, () => this.incrementBolus());
        }
    }

    // get user info for boluses
    // fetchUser(){
    //     axiosInstance.get(`api/users/${this.props.loggedInID}`)
    //     // .then(response => {
    //     //     return response.json();
    //     // })
    //     .then(userInfo => {
    //     this.setState({
    //         userInfo: userInfo.data
    //     });
    //     // console.log(this.state.userInfo)
    //     });
    // }

    fetchUserInfo(){
        axiosInstance.get(`api/userinfos/`)
        .then(result => {
            // console.log(result.data)
            let newArr = [];
            for (let user of result.data){
                if (user.user === this.props.loggedInID){
                    newArr.push(user);
                    console.log(newArr)
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

    



    // fetch first bolus in bolus endpoint then add one to it
    fetchLatestBolusID(){
        this._isMounted = true;
        axiosInstance.get('api/boluses/')
        // .then(response => response.json())
        .then(result => {
            // console.log(result)
            const loggedInID = this.props.loggedInID;
            if (result.data.length === 0){
                this.setState({
                    latestBolus: 0
                }, () =>  console.log(this.state.latestBolus));
            }
            // else if (result.data[0].user === loggedInID && this._isMounted){
            else if (this._isMounted){
                this.setState({
                    latestBolus: result.data[0].id + 1
                }, () =>  console.log(this.state.latestBolus));
            }
        })
        .catch(error => {
            throw error;
        });
    }

    //open add food modal
    renderAddFoodModal(){
        return (
            <table>
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Carbohydrates</th>
                        <th>Servings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><form id="newfood"><input className="form-control" name="foodName" autoFocus type="text" id="input-value-2" onChange={this.handleChange} value={this.state.foodName} required/></form></td>
                        <td><input form="newfood" className="form-control" name="carbs" autoFocus type="number" min="0" id="input-value-2" onChange={this.handleChange} value={this.state.carbs} required/></td>
                        <td><input form="newfood" className="form-control" name="servings" autoFocus type="number" min="0" step="0.5" id="input-value-2" onChange={this.handleChange} value={this.state.servings} required/></td>
                        <td><button form="newfood" className="btn btn-primary" id="new-food-button" onClick={e => this.addFoodToForm(e)}>Add</button></td>
                    </tr>
                    {/* once foods are added, show them below the input fields */}
                        {this.state.foodAdded.map((item, i) => (
                            <tr className="foodAdded" key={i}>
                                <td>{item.foodName}</td>
                                <td>{item.carbs}g</td>
                                <td>{item.servings}</td>
                                <td><button className="btn btn-danger btn-sm" id="delete-btn" onClick={e => this.deleteFoodFromForm(e, i)}>x</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        )
    }

    renderAddFoodLabel(){
        if (this.state.addFood === true)
            this.setState({
                addFoodLabel: 'Add Food (+)'
            })
        else{
            this.setState({
                addFoodLabel: 'Add Food (-)'
            })
        }
    }

    // adding foods to food list in new bolus form, increment carb total
    addFoodToForm(event){
        event.preventDefault();
        // add new food to state, and clear input values
        this.setState({
            foodAdded: [
                ...this.state.foodAdded,
                {
                    "foodName": this.state.foodName,
                    "carbs":  parseInt(this.state.carbs),
                    "servings":  parseFloat(this.state.servings)
                }
            ],
            foodName: '',
            carbs: 0,
            servings: 1
        });

        // add up carbs of foodAdded array to display as carb total
        let foodsArr = [...this.state.foodAdded];
        let carbTotal = this.state.carbTotal;

        carbTotal = this.state.carbs * this.state.servings;
        for (let i = 0; i < foodsArr.length; i++){
            carbTotal += (foodsArr[i].carbs * foodsArr[i].servings);
        }
        this.setState({
            carbTotal: carbTotal
        }, () => this.incrementBolus())
    }

    // remove food from list, decrement carb total
    deleteFoodFromForm(event, index){
        event.preventDefault();

        let foodArr = [...this.state.foodAdded];
        let carbTotal = this.state.carbTotal;
        
        for (let i = 0; i < foodArr.length; i++){
            const indexOfFood = foodArr.indexOf(foodArr[i]);
            if (indexOfFood === index){
                const carbsToSubtract = (foodArr[index].carbs * foodArr[index].servings);
                carbTotal = carbTotal - carbsToSubtract;
                foodArr.splice(indexOfFood, 1);
            }
        }
        
        this.setState({
            foodAdded: foodArr,
            carbTotal: carbTotal
        }, () => this.incrementBolus());
    }

    // add bolus to form
    incrementBolus(){
        const {low_threshold, high_threshold, carbs_per_unit} = this.state.userInfo[0];

        // set units
        let carbs = (this.state.carbTotal/carbs_per_unit);
        
        // set low and high adjustments
        let lowAdjust = (((low_threshold - this.state.bloodSugar)/4))*(0.1);
        let highAdjust = ((this.state.bloodSugar - high_threshold)/4)*(0.1);
        let bolus = this.state.bolusTotal;

        // deploy correction if possible
        if (this.state.bloodSugar < low_threshold) {
            bolus = carbs - lowAdjust;
        }
        else if (this.state.bloodSugar > high_threshold) {
            bolus = carbs + highAdjust;
        }
        else {
            bolus = carbs;
        }

        this.setState({
            bolusTotal: bolus.toFixed(1)
        });

        // numberRollup({
        //     id: "example",
        //     startNumber: 0,
        //     endNumber: 100,
        //     duration: 500
        //   });
    }

    // reset form so user doesn't need to delete foods one by one
    resetForm(event){
        event.preventDefault();
        this.setState({
            addFood: false,
            addFoodLabel: 'Add Food (+)',
            foodAdded: [],
            bolusTitle: '',
            bloodSugar: '',
            carbTotal: 0,
            bolusTotal: 0,
        });
    }

    componentDidMount(){
        // this.fetchUser();
        this.fetchUserInfo();
        this.fetchLatestBolusID();
        // this.props.fetchLatestBolusID();
        
    }

    // testMethod(){
    //     this.props.handleNewFoods(this.state.foods);
    // }

    newBolusAndBolusID(){
        this.props.handleNewBolus(this.state)
        // this.props.fetchLatestBolusID();
        // .then(() => this.props.fetchLatestBolusID())
        .then(() => this.props.handleNewFoods(this.state.foodAdded, this.state))
        // this.props.handleNewFoods(this.state.foodAdded, this.state);
    }
    // () => { this.newBolusAndBolusID(), this.props.handleNewFoods(this.state.foodAdded); }

    render(){
        return (
            <div>
                <form className="new-bolus-form" onSubmit={() => this.newBolusAndBolusID()}>
                    <div className="new-bolus-form-inner">
                        <button className="btn btn-danger btn-sm" id="new-bolus-button-x" onClick={(e) => this.props.handleExitNewBolusForm(e)}>X</button>
                        <div className="form-group">
                            <label id="label">Title:</label> <input className="form-control" name="bolusTitle" autoFocus type="text" id="input-value" onChange={this.handleChange} value={this.state.bolusTitle} required></input><br/>
                        </div>
                        <div className="form-group">
                            <label id="label">Blood sugar:</label> <input className="form-control" name="bloodSugar" autoFocus type="number" id="input-value" onChange={this.handleChange} value={this.state.bloodSugar} required></input> mg/dl<br/>
                        </div>
                        {this.state.errors.length > 0 ? <span className="errors_hint">{this.state.errors}</span> : null}
                        <div className="form-group">
                            <label id="label">Food Items:</label> <a id="new-food" type="submit" onClick={() => { this.setState({addFood: !this.state.addFood}); this.renderAddFoodLabel(); }}>{this.state.addFoodLabel}</a><br/>
                            {this.state.addFood ? this.renderAddFoodModal() : null}
                        </div>
                        <div className="form-group">
                            <label id="label">Carbohydrate Total:</label> {this.state.carbTotal}g<br/>
                        </div>
                        <div className="form-group">
                            <label id="label">Bolus Total:</label> {this.state.bolusTotal} units<br/>
                            {/* <label id="label">Bolus Total:</label> <p id="bolus_total">{this.state.bolusTotal}</p>units<br/> */}
                        </div>
                        {/* <div class="form-group" id="submit-bolus"> */}
                        <button className="btn btn-secondary" onClick={(e) => this.resetForm(e)}>Reset Form</button>
                        <button className="btn btn-primary" id="submit-bolus" type="submit">Submit</button>
                        {/* </div> */}
                    </div>
                </form>
            </div>
        );
    }
}
 
export default NewBolus;