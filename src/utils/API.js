import axios from "axios";

export default {
  //Meal Tracker API calls
  getTrackers: () => {
    return axios.get("https://mealtracker-java.herokuapp.com/api/trackers/");
  },
  saveTracker: (tracker) => {
    return axios.post("https://mealtracker-java.herokuapp.com/api/trackers/", tracker);
  },
  updateTracker: (tracker) => {
    return axios.put("https://mealtracker-java.herokuapp.com/api/trackers/" + tracker.id, tracker);
  },
  deleteTracker: (trackerId) => {
    return axios.delete("https://mealtracker-java.herokuapp.com/api/trackers/" + trackerId);
  },

  //Meal API calls
  getMeals: (trackerId) => {
    return axios.get("https://mealtracker-java.herokuapp.com/api/meals/" + trackerId);
  },
  saveMeal: (trackerId, meal) => {
    return axios.post("https://mealtracker-java.herokuapp.com/api/meals/" + trackerId, meal);
  },
  updateMeal: (trackerId, meal) => {
    return axios.put("https://mealtracker-java.herokuapp.com/api/meals/" + trackerId + "/" + meal.id, meal);
  },
  deleteMeal: (mealId) => {
    return axios.delete("https://mealtracker-java.herokuapp.com/api/meals/" + mealId);
  },

  //Food API calls
  getFoods: (mealId) => {
    return axios.get("https://mealtracker-java.herokuapp.com/api/food/" + mealId);
  },
  saveFood: (mealId, food) => {
    return axios.post("https://mealtracker-java.herokuapp.com/api/food/" + mealId, food);
  },
  updateFood: (mealId, food) => {
    return axios.put("https://mealtracker-java.herokuapp.com/api/food/" + mealId+ "/" + food.id, food);
  },
  deleteFood: (foodId) => {
    return axios.delete("https://mealtracker-java.herokuapp.com/api/food/" + foodId);
  }
}