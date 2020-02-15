import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./form.css";

class AddForm extends React.Component {
  state = {
      trackers: [],
      selected: "",
      formHeader: "Add A Tracker",
      placeholder: "Ex: John's Tracker",
      tracker: false,
      meal: false,
      food: false,
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
    if(this.props.trackers.length !== 0){
      this.setState({
        trackers: this.props.trackers,
      }, () => {
        this.formType();
      })
    };
  };

  formType = () => {
    //Checks if specific tracker was chosen -> form will add meal
    if(this.props.trackerId){
      this.setState({
        meal: true,
        formHeader: "Add A Meal",
        placeholder: "Ex: Breakfast/Denny's"
      })
      this.findList("tracker");
    };
    
    //Checks if specific meal was chosen -> form will add food
    if(this.props.mealId) {
      this.setState({
        food: true,
        formHeader: "Add A Meal Item",
        placeholder: "Ex: Salad"
      })
      this.findList("meal");
    };
  };

  findList = (name) => {
    let chosenTracker = this.props.trackers.filter(tracker => tracker.id === this.props.trackerId);
    if(name === "tracker"){
      this.setState({
        selected: "Tracker: " + chosenTracker[0].name
      });
    } else if(name === "meal"){
      let chosenTracker = this.props.trackers.filter(tracker => tracker.id === this.props.trackerId);
      let chosenMeal = chosenTracker[0].meals.filter(meal => meal.id === parseInt(this.props.mealId))
      this.setState({
        selected: "Meal: " + chosenMeal[0].name
      }); 
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
  validated = () => {
    this.setState({
      message: "Please Fill Out Form Completely"
    })
    if(this.state.food){
      if (!this.state.name || !this.state.fat || !this.state.carbs || !this.state.protein || !this.state.calories){
        return false;
      } else {
        this.setState({ message: "" })
        return true;
      };
    } else {
      if(!this.state.name){
        return false;
      } else {
        this.setState({ message: "" })
        return true;
      };
    };
  };

  //Submit Button
  add = () => {
    if(this.validated()){
      if(this.state.food){
        let id = this.props.mealId;
        let food = {
          name: this.state.name,
          fat: this.state.fat,
          carbs : this.state.carbs,
          protein: this.state.protein,
          calories: this.state.calories
        }

        this.props.actions.saveFood(id, food);
        this.props.history.push("/");
      } else if (this.state.meal){
        let id = this.props.trackerId;
        let meal = { name: this.state.name }

        this.props.actions.saveMeal(id, meal);
        this.props.history.push("/");
      } else {
        let tracker = { name: this.state.name }

        this.props.actions.saveTracker(tracker);
        this.props.history.push("/");
      };
    };
  };

  addAnother = (e) => {
    e.preventDefault();
    if(this.validated()){
      if(this.state.food){
        let id = this.props.mealId;
        let food = {
          name: this.state.name,
          fat: this.state.fat,
          carbs : this.state.carbs,
          protein: this.state.protein,
          calories: this.state.calories
        }
        this.props.actions.saveFood(id, food);
        this.setState({
          message: this.state.name + " has been added!"
        }, () => {
          this.refs.name.value = "";
          this.refs.fat.value = "";
          this.refs.carbs.value = "";
          this.refs.protein.value = "";
          this.refs.calories.value = "";         
        });
      };
    };
  };

  cancel = () => {
    this.props.history.push("/");
  };

  keyPressed(event) {
    if (event.key === "Enter") {
      this.add();
    }
  }

  render (){
    return (
      <div className="back">
        <div className="pad">
          <div className="formHead">
            <div>{this.state.selected}</div>
            <div>{this.state.formHeader}</div>
          </div>
          
          <div className="container">
            <form onChange={this.formUpdate} className="addForm">
              <div>
                <div className="label">Name:</div>
                <input name="name" placeholder={this.state.placeholder} ref="name" required></input>
              </div>
              { this.state.food ? (
                <div>
                  <div>
                    <div className="label">Fat: (in grams)</div>
                    <input name="fat" ref="fat" required></input>
                  </div>
                  <div>
                    <div className="label">Carbs: (in grams)</div>
                    <input name="carbs" ref="carbs" required></input>
                  </div>
                  <div>
                    <div className="label">Protein: (in grams)</div>
                    <input name="protein" ref="protein" required></input>
                  </div>
                  <div>
                    <div className="label">Calories: </div>
                    <input name="calories" ref="calories" required></input>
                  </div>
                </div>
              ):(null)}
              
              <div>
                <div className="message">{this.state.message}</div>
              </div>
              <div className="btnBox">
                <div onClick={this.add} className="addSub">Submit</div>
                <div onClick={this.cancel} className="cancel">Back</div>
              </div>
              {this.state.food ?(
                <div onClick={this.addAnother} className="addAnother">Submit & Add Another</div>
              ):(null)}
              <br></br>
            </form>
          </div>
        </div>
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
  return {
    trackers: state.trackers,
    trackerId: trackerId,
    mealId: mealId
  } 
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddForm));
