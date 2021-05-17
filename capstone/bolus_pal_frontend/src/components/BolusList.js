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
        }
        this.getBoluses = this.getBoluses.bind(this);
        this.getFoods = this.getFoods.bind(this);
        this.convertISODate = this.convertISODate.bind(this);
        this.handleExitNewBolusForm = this.handleExitNewBolusForm.bind(this);
        this.handleNewBolus = this.handleNewBolus.bind(this);
        this.handleNewFoods = this.handleNewFoods.bind(this);
        this.renderFoodTable = this.renderFoodTable.bind(this);
        this._isMounted = false;
    }

    // submit new bolus to db, render on page
    handleNewBolus(data){
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
    }

    handleNewFoods(data, state){
        for(let food of data){
            axiosInstance.post('api/foods/', {
                bolus: state.latestBolus,
                name: food.foodName,
                carbs: food.carbs,
                servings: food.servings
            })
            .catch(error => {
                throw error;
            });
        }
    }

    // retrieve list of boluses from api
    getBoluses(){
        this._isMounted = true;
        axiosInstance.get('api/boluses/')
        .then(result => {
            let newArr = [];
            for (let bolus of result.data){
                if (bolus.user === this.props.loggedInID){
                    newArr.push(bolus);
                }
            }
            if(this._isMounted){
                this.setState({
                    data: newArr,
                    loaded: true
                }, () => console.log(this.state.data)
            )};
        });
    }

    // get all foods
    getFoods(){
        this._isMounted = true;
        axiosInstance.get('api/foods/')
        .then(result => {
            let newArr = [];
            for (let food of result.data){
                newArr.push(food)
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
        this.getFoods();
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        this.getFoodsIntoBolus();
        return (
            <div>
                <h2 className="title">Your Boluses</h2>
                <button className="btn btn-primary" id="new-bolus" onClick={() => this.setState({handleNewBolus: true})}>Add New Bolus</button>
                <hr></hr>
                {this.state.handleNewBolus ? 
                <NewBolus
                    getBoluses={this.getBoluses}
                    getFoods={this.getFoods}
                    handleExitNewBolusForm={this.handleExitNewBolusForm}
                    handleNewBolus={this.handleNewBolus}
                    handleNewFoods={this.handleNewFoods}
                    loggedInID={this.props.loggedInID}
                /> : null}
            <ul className="bolus-array">
            {this.state.data.map((item, i) => (
                <div className="bolus-outer" key={i}>
                    <div className="bolus-inner">
                        <h3>{item.title}</h3>
                        <p id="timestamp">{this.convertISODate.call(this, item.timestamp)}</p>
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