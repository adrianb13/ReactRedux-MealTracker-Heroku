import API from "../utils/API";
import * as types from "./types.js";

/* Tracker Actions */
export const getTrackers = () => {
  return (dispatch) => {
    return API.getTrackers()
      .then(res => {
        dispatch(getTrackerSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const getTrackerSuccess = (trackers) => {
  return {type: types.GET_TRACKERS_SUCCESS, trackers};
};

export const saveTracker = (tracker) => {
  return (dispatch) => {
    return API.saveTracker(tracker)
      .then(res => {
        dispatch(saveTrackerSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const saveTrackerSuccess = (tracker) => {
  return { type: types.SAVE_TRACKER_SUCCESS, tracker};
};

export const updateTracker = (tracker) => {
  return (dispatch) => {
    return API.updateTracker(tracker)
      .then(res => {
        dispatch(updateTrackerSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const updateTrackerSuccess = (tracker) => {
  return { type: types.UPDATE_TRACKER_SUCCESS, tracker};
};

export const deleteTracker = (tracker) => {
  return (dispatch) => {
    return API.deleteTracker(tracker)
      .then(res => {
        dispatch(deleteTrackerSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const deleteTrackerSuccess = (tracker) => {
  return { type: types.DELETE_TRACKER_SUCCESS, tracker};
};

/* Meal Actions */
export const getMeals = (trackerId) => {
  return (dispatch) => {
    return API.getMeals(trackerId)
      .then(res => {
        dispatch(getMealSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const getMealSuccess = (meals) => {
  return { type: types.GET_MEAL_SUCCESS, meals};
};

export const saveMeal = (trackerId, meal) => {
  return (dispatch) => {
    return API.saveMeal(trackerId, meal)
      .then(res => {
        dispatch(saveMealSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const saveMealSuccess = (meal) => {
  return { type: types.SAVE_MEAL_SUCCESS, meal};
};

export const updateMeal = (trackerId, meal) => {
  return (dispatch) => {
    return API.updateMeal(trackerId, meal)
      .then(res => {
        dispatch(updateMealSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const updateMealSuccess = (meal) => {
  return { type: types.UPDATE_MEAL_SUCCESS, meal};
};

export const deleteMeal = (meal) => {
  return (dispatch) => {
    return API.deleteMeal(meal)
      .then(res => {
        dispatch(deleteMealSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const deleteMealSuccess = (meal) => {
  return { type: types.DELETE_MEAL_SUCCESS, meal};
};

/* Food Actions */
export const getFoods = (mealId) => {
  return (dispatch) => {
    return API.getFoods(mealId)
      .then(res => {
        dispatch(getFoodSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const getFoodSuccess = (foods) => {
  return { type: types.GET_FOOD_SUCCESS, foods};
};

export const saveFood = (mealId, food) => {
  return (dispatch) => {
    return API.saveFood(mealId, food)
      .then(res => {
        dispatch(saveFoodSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const saveFoodSuccess = (food) => {
  return { type: types.SAVE_FOOD_SUCCESS, food};
};

export const updateFood = (mealId, food) => {
  return (dispatch) => {
    return API.updateFood(mealId, food)
      .then(res => {
        dispatch(updateFoodSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const updateFoodSuccess = (food) => {
  return { type: types.UPDATE_FOOD_SUCCESS, food};
};

export const deleteFood = (food) => {
  return (dispatch) => {
    return API.deleteFood(food)
      .then(res => {
        dispatch(deleteFoodSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const deleteFoodSuccess = (food) => {
  return { type: types.DELETE_FOOD_SUCCESS, food};
};