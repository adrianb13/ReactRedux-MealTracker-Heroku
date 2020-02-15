import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./displayList.css";

/* Items Needed to Pass:
  props.show: true/false,
  props.header: "Tracker", "Meal", or "Meal Items/Food",
  props.add: Add link string ("Tracker", "Meal", or "Meal Items/Food"),
  props.url: link that will be used to pass params on whether we are adding a new tracker, meal, or food
  props.list: [array of trackers, meals, food],
  props.trackerId: (if available),
  props.mealId: (if available),
  props.selected: (selection function)
*/

class DisplayList extends React.Component {
  format = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.header} {this.props.group}</div>
        {this.props.show ? (
          <div>
            <div className="listGuide">(Select a {this.props.add} to view)</div>
            {this.props.list.map(item => (
              <div key={item.id} onClick={() => this.props.selected(this.props.header, item)}>
                {this.props.header === "Meals" ? (
                  <div className="itemBox">
                    <div className="listItem listFlex">
                      <div className="listMeal">{item.name}</div>
                      <div className="date">{this.format(item.createdAt)}</div>
                    </div>
                    <Link to={this.props.urlUD + "/" + item.id} className="listUpd">
                      <div >Update</div>
                    </Link>
                  </div>
                ):(
                  <div className="itemBox">
                    <div className="listItem">{item.name}</div>
                    <Link to={this.props.urlUD + "/" + item.id} className="listUpd">
                      <div>Update</div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <br></br>
            <Link to={this.props.urlAdd}>
              <div className="addItem">Add a {this.props.add}</div>
            </Link>
            <br></br>
          </div>
        ):(
          <div>
            <div>Not Available</div>
            <br></br>
            <Link to={this.props.urlAdd}>
              <div className="addItem">Add a {this.props.add}</div>
            </Link>
            <br></br>
          </div>
        )}
      </div>
    )
  }
};


export default withRouter(DisplayList);