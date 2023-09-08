import { FETCH_FOODS, FETCH_FOOD_DETAIL } from "../actions/actionType";

const initialState = {
  foods: [],
  foodDetail: {},
};

export default function foodReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case FETCH_FOODS:
      newState.foods = action.payload;
      return newState;

    case FETCH_FOOD_DETAIL:
      newState.foodDetail = action.payload;
      return newState;

    default:
      return state;
  }
}
