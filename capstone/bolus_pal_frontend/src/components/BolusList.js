import React, { Component } from 'react';
import NewBolus from './NewBolus';
import { getCookie } from './../getCookie';
import axiosInstance from './../AxiosApi';
// import CSRFToken from './csrfToken';

class BolusList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            foods: [],
            loaded: false,
            placeholder: "Loading",
            handleNewBolus: false,
            shown: {},
            iconClass: "fas fa-caret-right",
            // latestBolus: ''
            // tableCollapsed: true
            // addFood: false,
            // bolusTotal: 0,
            // carbTotal: 0
        }
        // this.getUser = this.getUser.bind(this);
        this.getBoluses = this.getBoluses.bind(this);
        this.getFoods = this.getFoods.bind(this);
        this.convertISODate = this.convertISODate.bind(this);
        this.handleExitNewBolusForm = this.handleExitNewBolusForm.bind(this);
        this.handleNewBolus = this.handleNewBolus.bind(this);
        // this.grabLatestBolusID = this.grabLatestBolusID.bind(this);
        this.handleNewFoods = this.handleNewFoods.bind(this);
        this.renderFoodTable = this.renderFoodTable.bind(this);
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
    
    handleNewBolus(data){
        //args: event, then everything I need in newBolus' state
        // event.preventDefault();
        // const loggedInID = this.props.loggedInID;
        return new Promise((resolve) => {
        axiosInstance.post('api/boluses/', {
            title: data.bolusTitle,
            user: this.props.loggedInID,
            carb_total: data.carbTotal,
            blood_sugar: data.bloodSugar,
            bolus_total: data.bolusTotal
        })
        .catch(error => {
            throw error;
        });
        resolve();
    });
    // call grabLatestBolusID right after the above is finished
    }

    // fetch first bolus in bolus endpoint
    // grabLatestBolusID(){
    //     this._isMounted = true;
    //     // const response = await this.handleNewBolus();
    //     // if (response){
    //         fetch('api/boluses/')
    //         .then(response => response.json())
    //         .then(data => {
    //             const loggedInID = this.props.loggedInID;
    //             // return data[0].id;
    //             // for(let i = 0; i < data.length; i++){
    //             if (data[0].user === loggedInID && this._isMounted){
    //                     // console.log(data[0].id);
    //                 this.setState({
    //                     latestBolus: data[0].id
    //                 }, () => this.getlatestBolus2());
    //             }
    //             // }
    //         })
    //         .catch(error => {
    //             throw error;
    //         });
    //         // console.log(this.state.latestBolus)
    // }

    // getlatestBolus2(){
    //     console.log(this.state.latestBolus)
    //     return this.state.latestBolus;
    // }

    // newBolusAndBolusID(){
    //     this.handleNewBolus(data).then(() => {this.grabLatestBolusID})
    // }

    handleNewFoods(data, state){
        this._isMounted = true;
        for(let food of data){
            console.log(state.latestBolus)
            // console.log(food)
            fetch('api/foods/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, */*',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    "bolus": state.latestBolus,
                    "name": food.foodName,
                    "carbs": food.carbs,
                    "servings": food.servings
                })
            })
            .then(response => response.json())
            .catch(error => {
                throw error;
            });
        }
    }

    // retrieve list of boluses from api
    getBoluses(){
        this._isMounted = true;
        axiosInstance.get('api/boluses/')
        // ,{
        //     headers: {
        //         'Authorization': "JWT " + localStorage.getItem('access_token')
        //     }
        // })
        // .then(response => {
        //     if (response.status > 400) {
        //         return this.setState({ placeholder: "Something went wrong!" });
        //     }
        //     return response.json();
        // })
        .then(result => {
            console.log(result)
            let newArr = [];
            for (let bolus of result.data){
                if (bolus.user === this.props.loggedInID){
                    newArr.push(bolus);
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

    getFoods(){
        this._isMounted = true;
        axiosInstance.get('api/foods/')
        // , {
        //     headers: {
        //         'Authorization': "JWT " + localStorage.getItem('access_token')
        //     }
        // })
        // .then(response => {
        //     if (response.status > 400) {
        //         return this.setState({ placeholder: "Something went wrong!" });
        //     }
        //     return response.json();
        // })
        .then(result => {
            // console.log(data)
            let newArr = [];
            for (let food of result.data){
                // if (f === this.props.loggedInID){
                newArr.push(food)
                // }
            }
            if(this._isMounted) {
                this.setState({
                    foods: newArr,
                    loaded: true
                }
                )};
            });
        }

    // take foods pulled from api and put them into relative bolus arrays
    getFoodsIntoBolus(){
        for(let bolus of this.state.data){
            bolus.foods = [];
        }
        for(let i = 0; i < this.state.foods.length; i++){
            for (let j = 0; j < this.state.data.length; j++){
                if (this.state.foods[i].bolus === this.state.data[j].id){
                    this.state.data[j].foods.push(this.state.foods[i])
                }
            }
        }
    }

    renderFoodTable(bolus_id){
        this.setState({
            shown: {
                ...this.state.shown,
                [bolus_id]: !this.state.shown[bolus_id],
            }
        });
    }

    renderFoodIcon(bolus_id){
        return this.state.shown[bolus_id] ? "fas fa-caret-down" : "fas fa-caret-right";
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

        // this.grabLatestBolusID();
        // this.handleNewFoods();
        // console.log(this.state.latestBolus)
        // console.log(this.state.latestBolus)

        this.getBoluses();
        this.getFoods();
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        // this.grabLatestBolusID();
        this.getFoodsIntoBolus();
        return (
            <div className="">
                <h2 className="title">Your Boluses</h2>
                <button className="btn btn-primary" id="new-bolus" onClick={() => this.setState({handleNewBolus: true})}>Add New Bolus</button>
                <hr></hr>
                {this.state.handleNewBolus ? 
                <NewBolus 
                    handleExitNewBolusForm={this.handleExitNewBolusForm}
                    handleNewBolus={this.handleNewBolus}
                    handleNewFoods={this.handleNewFoods}
                    loggedInID={this.props.loggedInID}
                /> : null}
            <ul>
            {this.state.data.map((item, i) => (
                <div className="bolus-outer" key={i}>
                    <div className="bolus-inner">
                        <h3>{item.title}</h3>
                        <p id="timestamp">{this.convertISODate.call(this, item.timestamp)}</p>
                        {/* <hr></hr> */}
                        <p id="label">Blood sugar:</p> <p id="value">{item.blood_sugar}mg/dl</p> <br/>
                        <p id="label">Foods:</p> <i className={this.renderFoodIcon(item.id)} onClick={this.renderFoodTable.bind(this, item.id)}></i><br/>
                        {this.state.shown[item.id] ?
                        item.foods.length > 0 ? 
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Food Name</th>
                                        <th>Carbohydrates</th>
                                        <th>Servings</th>
                                    </tr>
                                </thead>
                            {item.foods.map((food, i) => (
                                <tbody key={i}>
                                    <tr>
                                        <td>{food.name}</td>
                                        <td>{food.carbs}g</td>
                                        <td>{food.servings}</td>
                                    </tr>
                                </tbody>
                            ))} 
                            </table> 
                        </div>
                        : <div><p id="value">There are no foods for this bolus.</p> <br/></div>
                        : null}
                        <p id="label">Carbohydrate total:</p> <p id="value">{item.carb_total}g</p> <br/>
                        <p id="label">Bolus Total:</p> <p id="value">{item.bolus_total} units</p><br/>
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