import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./form.css";

import Modal from "../Modal";

class UpdateDeleteForm extends React.Component {
  state = {
      trackers: [],
      selected: "",
      formHeader: "",
      placeholder: "",
      tracker: false,
      meal: false,
      food: false,
      modal: false
  }

  componentDidMount(){
    this.dataload();
  }

  componentDidUpdate(nextProps){
		if(this.props.trackers !== nextProps.trackers){
      this.dataload();
		}
  };
  
  dataload = () => {
    //Checks if meal trackers exist -> form will add tracker
    if(this.props.trackers.length !== 0 && this.props.meals.length !== 0 && this.props.foods.length !== 0){
      this.setState({
        trackers: this.props.trackers,
        meals: this.props.meals,
        foods: this.props.foods
      }, () => {
        this.formType();
      });
    } else if (this.props.trackers.length !== 0 && this.props.meals.length !== 0){
      this.setState({
        trackers: this.props.trackers,
        meals: this.props.meals
      }, () => {
        this.formType();
      });
    } else if(this.props.trackers.length !== 0){
      this.setState({
        trackers: this.props.trackers,
      }, () => {
        this.formType();
      });
    };
  };

  formType = () => {
    //Sets form to update/delete selected FOOD
    if(this.props.foodId){
      this.setState({
        food: true,
        formHeader: "Meal Item"
      })
      this.findList("food");
    }
    //Sets form to update/delete selected MEAL
    else if(this.props.mealId) {
      this.setState({
        meal: true,
        formHeader: "Meal"
      })
      this.findList("meal");
    }
    //Sets form to update/delete selected TRACKER
    else if(this.props.trackerId){
      this.setState({
        tracker: true,
        formHeader: "Tracker"
      })
      this.findList("tracker");
    };
  };

  //Pre-fills Form by finding selected tracker/meal/food
  findList = (name) => {
    let chosenTracker = this.props.trackers.filter(tracker => tracker.id === this.props.trackerId);
    if(name === "tracker"){
      this.setState({ selected: chosenTracker[0] });
    } else if(name === "meal"){
      if(this.props.meals.length === 0){
        let chosenMeal = chosenTracker[0].meals.filter(meal => meal.id === parseInt(this.props.mealId));
        this.setState({ selected: chosenMeal[0] });
      } else {
        let chosenMeal = this.props.meals.filter(meal => meal.id === parseInt(this.props.mealId));
        this.setState({ selected: chosenMeal[0] });
      };
    } else if (name === "food"){
      if(this.props.foods.length === 0){
        let chosenMeal = chosenTracker[0].meals.filter(meal => meal.id === parseInt(this.props.mealId));
        let chosenFood = chosenMeal[0].foods.filter(food => food.id === parseInt(this.props.foodId));
        this.setState({ selected: chosenFood[0] });
      } else {
        let chosenFood = this.props.foods.filter(food => food.id === parseInt(this.props.foodId));
        this.setState({ selected: chosenFood[0] });
      }
      
    };
  };

  //Form Inputs
  formUpdate = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      message: ""
    });
  };

  //Validate Inputs
  validate = () => {
    this.setState({
      message: "***Please Enter A Name***"
    });
     
    if(this.state.food){
      if(!this.state.fat){
        this.setState({fat: this.state.selected.fat});
      }
      if(!this.state.carbs){
        this.setState({carbs: this.state.selected.carbs});
      }
      if(!this.state.protein){
        this.setState({protein: this.state.selected.protein});
      }
      if(!this.state.calories){
        this.setState({calories: this.state.selected.calories});
      }
      if (this.state.name){
        this.setState({
          message: ""
        },()=>{
          this.update()
        }); 
        
      };
    } else {
      if(this.state.name){
        this.setState({
          message: ""
        },()=>{
          this.update()
        });
        
      };
    };
  };

  //Submit Button
  update = () => {
    if(this.state.food){ 
      //Food Updated
      let id = this.props.mealId;
      let food = {
        id: this.props.foodId,
        name: this.state.name,
        fat: this.state.fat,
        carbs : this.state.carbs,
        protein: this.state.protein,
        calories: this.state.calories,
        meal: {
          id: this.props.mealId
        }
      };
      this.props.actions.updateFood(id, food);
      this.props.history.push("/");
    } else if (this.state.meal){ 
      //Meal Updated
      let id = this.props.trackerId;
      let meal = {
        id: this.props.mealId, 
        name: this.state.name,
        mealTracker: {
          id: this.props.trackerId
        }
      };
      this.props.actions.updateMeal(id, meal);
      this.props.history.push("/");
    } else { 
      //Tracker Updated
      let tracker = {
        id: this.props.trackerId,
        name: this.state.name 
      }
      this.props.actions.updateTracker(tracker);
      this.props.history.push("/");
    };
  };

  //Opens/Closes Delete Confirmation Modal
  confirm = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  //Delete Selected Item
  delete = () => {
    if(this.props.foodId){
      // Delete Food
      this.props.actions.deleteFood(this.props.foodId);
      this.props.history.push("/");
    } else if (this.props.mealId){
      // Delete Meal
      this.props.actions.deleteMeal(this.props.mealId);
      this.props.history.push("/");
    } else if (this.props.trackerId){
      // Delete Tracker
      this.props.actions.deleteTracker(this.props.trackerId);
      this.props.history.push("/");
    }
  }

  //Return to Home Page
  cancel = () => {
    this.props.history.push("/");
  };

  keyPressed(event) {
    if (event.key === "Enter") {
      this.validate();
    }
  }

  render (){
    return (
      <div className="back">
        <div className="pad">
          <div className="formHead">
            <div className="underline">{this.state.formHeader}: {this.state.selected.name}</div>
            <div>Update or Delete {this.state.formHeader}</div>
          </div>
          
          <div className="container">
            <form onChange={this.formUpdate} className="addForm">
              <div>
                <div className="label">Name:</div>
                <input name="name" placeholder={this.state.selected.name} ref="name" required></input>
              </div>
              { this.state.food ? (
                <div>
                  <div>
                    <div className="label">Fat: (in grams)</div>
                    <input name="fat" ref="fat" placeholder={this.state.selected.fat}></input>
                  </div>
                  <div>
                    <div className="label">Carbs: (in grams)</div>
                    <input name="carbs" ref="carbs" placeholder={this.state.selected.carbs}></input>
                  </div>
                  <div>
                    <div className="label">Protein: (in grams)</div>
                    <input name="protein" ref="protein" placeholder={this.state.selected.protein}></input>
                  </div>
                  <div>
                    <div className="label">Calories: </div>
                    <input name="calories" ref="calories" placeholder={this.state.selected.calories}></input>
                  </div>
                </div>
              ):(null)}
              
              <div>
                <div className="message">{this.state.message}</div>
              </div>
              <div className="btnBox">
                <div onClick={this.validate} className="addSub">Submit</div>
                <div onClick={this.cancel} className="cancel">Back</div>
              </div>
              <div onClick={this.confirm} className="addAnother delete">Delete</div>
              <br></br>
            </form>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            modalText = {"Are you sure you want to delete: " + this.state.selected.name + "?"}
            modal = {this.state.modal}
            delete = {this.delete} //Yes Button
            confirm = {this.confirm} //No Button
          ></Modal>
        ):(null)}
        <br></br>
      </div>
    )
  };
};

const mapStateToProps = (state, ownProps) => {
  let trackerId = 0;
  if(ownProps.match.params.trackerId){
    trackerId = parseInt(ownProps.match.params.trackerId);
  }
  let mealId = 0;
  if(ownProps.match.params.mealId){
    mealId = parseInt(ownProps.match.params.mealId);
  }
  let foodId = 0;
  if(ownProps.match.params.foodId){
    foodId = parseInt(ownProps.match.params.foodId);
  }
  return {
    trackers: state.trackers,
    meals: state.meals,
    foods: state.foods,
    trackerId: trackerId,
    mealId: mealId,
    foodId: foodId
  } 
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdateDeleteForm));
