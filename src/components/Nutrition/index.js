import React from "react";
import { withRouter } from "react-router-dom";
import "./nutrition.css";

const Nutrition = (props) => {
  return (
    <div>
      {props.showNutrition ? (
      <div>
        <hr></hr>
        <div className="tableTitle">"{props.selFood.name}" Details</div>
        <table className="table">
          <thead>
            <tr>

              <th>Calories (cal):</th>
              <th>Fat: (g)</th>
              <th>Carbs: (g)</th>
              <th>Protein: (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr key={props.selFood.id}>
              <td>{props.selFood.calories}</td>
              <td>{props.selFood.fat}</td>
              <td>{props.selFood.carbs}</td>
              <td>{props.selFood.protein}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ):(null)}
    </div>
  )
};

export default withRouter(Nutrition);