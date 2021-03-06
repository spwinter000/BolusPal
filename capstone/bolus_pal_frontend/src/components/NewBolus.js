import React, { Component }from 'react';
// import NewBolus from './NewBolus';

class NewBolus extends Component {
    constructor(props){
        super(props);
        this.state = {
            addFood: false,
            addFoodLabel: 'Add Food (+)',
            foodName: '',
            carbs: 0,
            servings: 0,
            foodAdded: [],
            bolusTotal: 0,
            carbTotal: 0   
        }
        this.handleChange = this.handleChange.bind(this);
        this.addFoodToForm = this.addFoodToForm.bind(this);
    }

    // go into state and find name from target element and set that property's value to target element value
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    renderAddFoodModal(){
        // this.renderAddFoodLabel()
        //open add food modal
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
                        <td><input className="form-control" name="foodName" autoFocus type="text" id="input-value-2" onChange={this.handleChange} value={this.state.foodName} required/></td>
                        <td><input className="form-control" name="carbs" autoFocus type="number" min="0" id="input-value-2" onChange={this.handleChange} value={this.state.carbs} required/></td>
                        <td><input className="form-control" name="servings" autoFocus type="number" min="0" step="0.5" id="input-value-2" onChange={this.handleChange} value={this.state.servings} required/></td>
                        <td><button className="btn btn-primary" id="new-food-button" onClick={e => this.addFoodToForm(e)}>Add</button></td>
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

    //adding foods to food list in new bolus form
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
            servings: 0
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
        })
    }

    // countCarbs(){
    //     let foodsArr = [...this.state.foodAdded];
    //     let carbTotal = this.state.carbTotal;

    //     carbTotal = this.state.carbs * this.state.servings;
    //     for (let i = 0; i < foodsArr.length; i++){
    //         carbTotal += (foodsArr[i].carbs * foodsArr[i].servings);
    //         // console.log(carbTotal);
    //     }
    //     this.setState({
    //         carbTotal: carbTotal
    //     })

    //     // console.log(foodsArr)
    // }

    // remove food from list
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
        });
    }

    render(){
        return (
            <div>
                <form className="new-bolus-form">
                    <div className="new-bolus-form-inner">
                        <button className="btn btn-danger btn-sm" id="new-bolus-button-x" onClick={(e) => this.props.handleExitNewBolusForm(e)}>X</button>
                        <div className="form-group">
                            <label id="label">Blood sugar:</label> <input className="form-control" autoFocus type="number" id="input-value" required></input> mg/dl<br/>
                        </div>
                        <div className="form-group">
                            <label id="label">Food Items:</label> <a id="new-food" type="submit" onClick={() => { this.setState({addFood: !this.state.addFood}); this.renderAddFoodLabel(); }}>{this.state.addFoodLabel}</a><br/>
                            {this.state.addFood ? this.renderAddFoodModal() : null}
                        </div>
                        <div className="form-group">
                            <label id="label">Carbohydrate total:</label> {this.state.carbTotal}g<br/>
                        </div>
                        <div className="form-group">
                            <label id="label">Bolus Total:</label> {this.state.bolusTotal} units<br/>
                        </div>
                        <input className="btn btn-primary" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default NewBolus;