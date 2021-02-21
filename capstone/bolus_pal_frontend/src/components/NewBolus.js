import React, { Component }from 'react';
// import NewBolus from './NewBolus';

class NewBolus extends Component {
    constructor(props){
        super(props);
        this.state = {
            addFood: false,
            foods: [],
            bolusTotal: 0,
            carbTotal: 0   
        }
        // this.handleChange = this.handleChange.bind(this);
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
        return(
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
                        <td><input className="form-control" autoFocus type="text" id="input-value-2"/></td>
                        <td><input className="form-control" autoFocus type="number" id="input-value-2"/></td>
                        <td><input className="form-control" autoFocus type="number" id="input-value-2"/></td>
                        <td><button className="btn btn-primary" id="new-food-button">Add</button></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    //adding food to food list in new bolus form
    addFoodToForm(){
        //take food info thats typed in and append it to the form under the food table headers
        //add onclick to 'Add' button in addFoodModal
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