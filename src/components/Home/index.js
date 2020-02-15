import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./home.css";

import DisplayList from "../DisplayList";
import Nutrition from "../Nutrition";

class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      trackers: [],
      meals: [],
      foods: [],
      selFood: [],
      trackerId: 0,
      trackerName: "",
      mealId: 0,
      mealName: "",
      displayT: true,
      displayM: false,
      displayF: false,
      showTracker: false,
      showMeal: false,
      showFood: false,
      showNutrition: false
    }
  };

  componentDidMount = () => {
    this.dataLoad();
  };

  componentDidUpdate(nextProps){
		if(this.props.trackers !== nextProps.trackers){
			this.dataLoad();
    }
  };

  dataLoad = () => {
    if(this.props.trackers.length !== 0){
      this.setState({
        trackers: this.props.trackers,
        showTracker: true
      }, () => {
      })
    }
  };

  selected = (header, item) => {
    if(header === "Trackers"){
      this.listMeals(item);
    } else if (header === "Meals") {
      this.listFood(item);
    } else if (header === "Meal Items") {
      this.nutrition(item);
    }
  }

  listMeals = (tracker) => {
    this.props.actions.getMeals(tracker.id)
    .then(res => {
      this.setState({
        trackerId: parseInt(tracker.id),
        trackerName: "for " + tracker.name,
        meals: this.props.meals.reverse(),
        showMeal: false 
      }, () => {
        this.setState({
          displayT: false,
          displayM: true
        })
      })
      if(this.props.meals.length !== 0){
        this.setState({          
          showMeal: true
        }, () => {})
      }
    })
  }

  listFood = (meal) => {
    this.props.actions.getFoods(meal.id)
    .then(res => {
      this.setState({
        mealId: parseInt(meal.id),
        mealName: "for " + meal.name,
        foods: this.props.foods.reverse(),
        showFood: false
      }, () => {
        this.setState({
          displayM: false,
          displayF: true
        })
      })
      if(this.props.foods.length !== 0){
        this.setState({
          showFood: true
        })
      }
    })

    if(this.props.foods.length !== 0){
      this.setState({
        foods: this.props.foods.reverse(),
        showFood: true        
      }, () => {})
    }
  }

  nutrition = (food) => {
    let item = this.state.foods.filter(item => item.id === food.id);
    this.setState({
      selFood: item[0],
      showNutrition: true
    })
  }

  backButton = () => {
    if(this.state.displayM){
      this.setState({
        displayM: false,
        displayT: true
      })
    } else if (this.state.displayF){
      this.setState({
        displayF: false,
        displayM: true,
        showNutrition: false
      })
    }
  }

  render () {
    return (
      <div className="back">
        <div className="banner">
          <div className="banImg">
            <div className="banTxt">Meal Tracker</div>
          </div>
        </div>

        <div className="container">
          <div>

            <div> 
              <div>
                {this.state.displayT ? (
                  <div>
                    <DisplayList
                      show = {this.state.showTracker}
                      header = "Trackers"
                      add = "Tracker"
                      urlAdd = "/add"
                      urlUD = "/update"
                      list = {this.state.trackers}
                      selected = {this.selected}
                    ></DisplayList>
                  </div>
                ):(null)}
              </div>
              <div>
                {this.state.displayM ? (
                  <div>
                    <div className="backDisplay" onClick={this.backButton}><i className="arrow left"></i> Back</div>
                    <DisplayList
                      show = {this.state.showMeal}
                      header = "Meals"
                      group = {this.state.trackerName}
                      add = "Meal"
                      urlAdd = {"/add/" + this.state.trackerId + "/meal/"}
                      urlUD = {"/update/" + this.state.trackerId}
                      list = {this.state.meals}
                      trackerId = {this.state.trackerId}
                      selected = {this.selected}
                    ></DisplayList>
                  </div>
                ) : (null)}    
              </div>
              <div>
                {this.state.displayF ? (
                  <div>
                    <div className="backDisplay" onClick={this.backButton}><i className="arrow left"></i> Back</div>
                    <DisplayList
                      show = {this.state.showFood}
                      header = "Meal Items"
                      group = {this.state.mealName}
                      add = "Meal Item"
                      urlAdd = {"/add/" + this.state.trackerId + "/" + this.state.mealId + "/food"}
                      urlUD = {"/update/" + this.state.trackerId + "/" + this.state.mealId}
                      list = {this.state.foods}
                      trackerId = {this.state.trackerId}
                      mealId = {this.state.mealId}
                      selected = {this.selected}
                    ></DisplayList>
                  </div>
                ) : (null)}    
              </div>
            </div>

            <div>
              <Nutrition
                showNutrition={this.state.showNutrition}
                selFood={this.state.selFood}
              ></Nutrition>
            </div>
          </div>
          <br></br>
        </div>
        <br></br>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { 
    trackers : state.trackers,
    meals : state.meals,
    foods : state.foods
  }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));