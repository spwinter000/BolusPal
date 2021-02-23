import React, { Component }from 'react';
// import NewBolus from './NewBolus';

class NewBolus extends Component {
    constructor(props){
        super(props);
        this.state = {
            addFood: false,
            // foods: [],
            foodName: '',
            carbs: 0,
            servings: 0,
            // foodAdded: false,
            foodAdded: [],
            bolusTotal: 0,
            carbTotal: 0   
        }
        this.handleChange = this.handleChange.bind(this);
        this.addFoodToForm = this.addFoodToForm.bind(this);
    }

    // go into state and find name from target element and set that property's value to target element value
    handleChange(event){
        // if(event.target.value != ""){
            this.setState({[event.target.name]: event.target.value})
        // }
    }

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
    //                         {this.state.addFood ? this.addFoodModal() : null}
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

    addFoodModal(){
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
                                <td>{item.carbs}</td>
                                <td>{item.servings}</td>
                                <td><button className="btn btn-danger" id="new-food-button" onClick={e => this.deleteFoodFromForm(e, i)}>Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        )
    }

    //adding food to food list in new bolus form
    addFoodToForm(event){
        event.preventDefault();
        // console.log(this.state.foodAdded)

        console.log(this.state.foodName)
        console.log(this.state.carbs)
        console.log(this.state.servings)

        this.setState({
            // foodAdded: true,
            foodAdded: [
                ...this.state.foodAdded,
                {
                    "foodName": this.state.foodName,
                    "carbs":  parseInt(this.state.carbs),
                    "servings":  parseFloat(this.state.servings)
                }
            ],
            // foodName: '',
            // carbs: '',
            // servings: '',
        }, () => console.log(this.state.foodAdded));


        // console.log(this.state.foodName)
        // console.log(this.state.carbs)
        // console.log(this.state.servings)

        // carbCount
        // let foodsArr = [...this.state.foodAdded];
        // let carbTotal = this.state.carbTotal;
        // carbTotal = this.state.carbs * this.state.servings;
        // // for (let i = 0; i < foodsArr.length; i++){
        // //     carbTotal += foodsArr[i].carbs;
        //     // console.log(carbTotal);
        //     // let carbTotal = item.carbs++;
        // this.setState({
        //     carbTotal: carbTotal
        // })
        // }


        // return (
        //     <table>
        //         <tbody>
        //             <tr>
        //                 <td>{this.state.foodName}</td>
        //                 <td>{this.state.carbs}</td>
        //                 <td>{this.state.servings}</td>
        //                 {/* <td><button className="btn btn-primary" id="new-food-button" onSubmit={this.addFoodToForm}>Add</button></td> */}
        //             </tr>
        //         </tbody>
        //     </table>
        // )
        //take food info thats typed in and append it to the form under the food table headers
        //add onclick to 'Add' button in addFoodModal
    }

    // remove food from list
    deleteFoodFromForm(event, index){
        event.preventDefault();
        // console.log(index)

        let foodArr = [...this.state.foodAdded];

        for (let i = 0; i < foodArr.length; i++){
            const indexOfFood = foodArr.indexOf(foodArr[i]);
            if (indexOfFood === index){
                foodArr.splice(indexOfFood, 1);
            }
        }
        
        this.setState({
            foodAdded: foodArr
        });

    }

    render(){
    return (
        <div>
            <form className="new-bolus-form">
                <div className="new-bolus-form-inner">
                    <button className="btn btn-danger btn-sm" id="new-bolus-button-x" onClick={(e) => this.props.handleExitNewBolusForm(e)}>X</button>
                    <div className="form-group">
                        <label id="label">Blood sugar:</label> <input className="form-control" autoFocus type="number" id="input-value"></input> mg/dl<br/>
                    </div>
                    <div className="form-group">
                        <label id="label">Food Items:</label> <a id="new-food" type="submit" onClick={() => this.setState({addFood: true})}>Add Food (+) </a><br/>
                        {this.state.addFood ? this.addFoodModal() : null}

                        {/* {this.state.foodAdded ?this.addFoodToForm() : null} */}
                    </div>
                    <div className="form-group">
                        <label id="label">Carbohydrate total:</label> {this.state.carbTotal} g<br/>
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