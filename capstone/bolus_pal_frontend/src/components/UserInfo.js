import React from 'react';

//component for displaying/editing user settings
const UserInfo = ({userInfo}) => {


  // editInfo(e){
  //   e.preventDefault();
    
  


  // }

// for later

//   <div className="user-specs" key={item.id}>
//   {/* <p>User: {item.username}</p> */}
//   <p key={item.low_threshold}>Low threshold: </p>  
//   {this.state.edit ? 
//   <div className="input">
//       <p key={'1'}><input type="number" name="lowThreshold" onChange={this.handleChange} value={this.state.lowThreshold}/> mg/dl </p>
//       <button onClick={() => { this.setState({edit: !this.state.edit}); (e) => this.saveInfo(e, item) }} id="edit-button">Save</button>
//   </div> 
//   : 
//   <div className="input">
//       <p>{item.low_threshold}mg/dl</p>
//       <button onClick={() => { this.setState({edit: !this.state.edit, lowThreshold: item.low_threshold}); (e) => this.editInfo(e, item, item.low_threshold) }} id="edit-button">Edit</button>
//   </div>}

//   <p key={'2'}>High threshold: </p>  
//   <div key={item.high_threshold} className="input">
//       <p>{item.high_threshold}mg/dl</p>
//       <button onClick={() => { this.setState({highThreshold: item.high_threshold}), (e) => this.editInfo.bind(this, e, item.high_threshold) }} id="edit-button">Edit</button>
//   </div>
//   {this.state.editInfo[item.highThreshold] ? 
//   <div key={item.high_threshold} className="input">
//       <p><input type="number" name="highThreshold" onChange={this.handleChange} value={this.state.highThreshold}/> mg/dl </p>
//       <button onClick={() => { this.setState({edit: !this.state.edit}); (e) => this.saveInfo(e, item) }} id="edit-button">Save</button>
//   </div> 
//   : 
//   null
//   }


  

//   {/* () => { this.setState({edit: !this.state.edit}); (e) => this.editInfo(e, item) } */}
//   {/* {this.state.edit ? <input key={'1'} value={item.low_threshold}/> : null} */}
//   {/* <p key={item.high_threshold}>High threshold: {item.high_threshold}mg/dl</p><i className="fas fa-pencil-alt"></i> */}
//   <p key={item.carbs_per_unit}>Carbs per unit: {item.carbs_per_unit}g</p><i className="fas fa-pencil-alt"></i>
// </div>










    return (
      <div className="settings-div-outer">
        <div className="settings-div-inner">
          {userInfo.map((item, i) => (
            <div className="user-specs" key={i}>
                    {/* <p>User: {item.username}</p> */}
                    <p>Low threshold: {item.high_threshold}mg/dl</p><i onClick={(e) => this.editInfo(e)} class="fas fa-pencil-alt"></i>
                    <p>High threshold: {item.low_threshold}mg/dl</p><i class="fas fa-pencil-alt"></i>
                    <p>Carbs per unit: {item.carbs_per_unit}g</p><i class="fas fa-pencil-alt"></i>
            </div>
            ))}
        </div>
      </div>
     );
}
 
export default UserInfo;