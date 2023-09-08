import { FETCH_CATEGORY, FETCH_FOODS, FETCH_FOOD_DETAIL } from "./actionType";
const BASE_URL = "http://localhost:3000";

export function fetchFoods(filter = "") {
  return async function (dispatch) {
    try {
      let url = `${BASE_URL}/user/food`;
      if (filter) url += `?filter=${filter}`;

      const response = await fetch(url, {
        method: "GET",
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_FOODS,
        payload: responseJSON,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchFoodDetail(id) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${BASE_URL}/user/food/` + id, {
        method: "GET",
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_FOOD_DETAIL,
        payload: responseJSON,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchCategories(filter = "") {
  return async function (dispatch) {
    try {
      let url = `${BASE_URL}/user/categories`;
      if (filter) url += `?filter=${filter}`;
      const response = await fetch(url, {
        method: "GET",
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        throw { message: responseJSON.message };
      }

      dispatch({
        type: FETCH_CATEGORY,
        payload: responseJSON,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
