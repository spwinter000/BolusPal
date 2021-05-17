import React, { Component }from 'react';
import { getCookie } from './../getCookie';
import axiosInstance from './../AxiosApi';

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
        this.addFoodToForm = this.addFoodToForm.bind(this);
        this.submitNewBolus = this.submitNewBolus.bind(this);
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

    fetchUserInfo(){
        axiosInstance.get(`api/userinfos/`)
        .then(result => {
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
        .then(result => {
            if (result.data.length === 0){
                this.setState({
                    latestBolus: 0
                }, () =>  console.log(this.state.latestBolus));
            }
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
            <table className="new-food-table">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Carbohydrates</th>
                        <th>Servings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><form id="food_form"><input className="form-control" name="foodName" autoFocus type="text" id="input-value-2" onChange={this.handleChange} value={this.state.foodName} required/></form></td>
                        <td><input form="food_form" className="form-control" name="carbs" autoFocus type="number" min="0" id="input-value-2" onChange={this.handleChange} value={this.state.carbs} required/></td>
                        <td><input form="food_form" className="form-control" name="servings" autoFocus type="number" min="0" step="0.5" id="input-value-2" onChange={this.handleChange} value={this.state.servings} required/></td>
                        <td><button form="food_form" className="btn btn-primary" id="new-food-button" onClick={e => this.addFoodToForm(e)}>Add</button></td>
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
        this.fetchUserInfo();
        this.fetchLatestBolusID();
    }

    submitNewBolus(e){
        e.preventDefault();
        return new Promise((resolve) => {
            resolve(this.props.handleNewBolus(this.state));
        })
        .then(setTimeout(() => this.props.handleNewFoods(this.state.foodAdded, this.state), 200))
        .then(setTimeout(() => this.props.getBoluses(), 400)) //call getBoluses and getFoods to update BolusList state with new submitted bolus
        .then(setTimeout(() => this.props.getFoods(), 650))
        .catch(error => {
            throw error;
        });
    }

    render(){
        return (
            <div>
                <form className="new-bolus-form">
                    <div className="new-bolus-form-inner">
                            <p id="new-bolus-button-x" onClick={(e) => this.props.handleExitNewBolusForm(e)}>X</p>
                            <div className="test">
                                <div className="form-group" id="new-form">
                                    <label id="label">Title:</label> <input className="form-control" name="bolusTitle" autoFocus type="text" id="input-value" onChange={this.handleChange} value={this.state.bolusTitle} required></input><br/>
                                </div>
                                <div className="form-group" id="bloodSugarDiv">
                                {/* <div className="form-group"> */}
                                    <label id="label">Blood sugar:</label> <input className="form-control" name="bloodSugar" autoFocus type="number" id="input-value" onChange={this.handleChange} value={this.state.bloodSugar} required></input><br/>
                                </div>
                                {/* BG error */}
                                {/* {this.state.errors.length > 0 ? <span className="errors_hint"><b>!</b><small> {this.state.errors}</small></span> : <span></span>} */}
                                <div className="form-group" id="new-form">
                                    <label id="label">Food Items:</label> <a id="new-food" type="submit" onClick={() => { this.setState({addFood: !this.state.addFood}); this.renderAddFoodLabel(); }}>{this.state.addFoodLabel}</a><br/>
                                    {this.state.addFood ? this.renderAddFoodModal() : null}
                                </div>
                                <div className="form-group" id="new-form">
                                    <label id="label">Carbohydrate Total:</label> <span>{this.state.carbTotal}g</span><br/>
                                </div>
                                <div className="form-group" id="new-form">
                                    <label id="label">Bolus Total:</label> <span>{this.state.bolusTotal} units</span><br/>
                                    {/* <label id="label">Bolus Total:</label> <p id="bolus_total">{this.state.bolusTotal}</p>units<br/> */}
                                </div>
                            </div>
                            {/* <div class="form-group" id="submit-bolus"> */}
                            <button className="btn btn-secondary" id="reset-button" onClick={(e) => this.resetForm(e)}>Reset Form</button>
                            <button className="btn btn-primary" id="submit-bolus" onClick={(e) => {this.submitNewBolus(e), this.props.handleExitNewBolusForm(e)}} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default NewBolus;