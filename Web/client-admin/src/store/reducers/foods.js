import { FETCH_FOODS, FETCH_FOODS_LOADING, FETCH_FOODS_DETAILS } from "../actions/actionType";

const initialState = {
  foods: [],
  foodDetail: {},
  foodsLoading: false,
};

export default function foodReducer(state = initialState, action) {
  const newState = { ...state };
  
  switch (action.type) {
    case FETCH_FOODS:
      newState.foods = action.payload;
      return newState;

    case FETCH_FOODS_LOADING:
      newState.foodsLoading = action.payload;
      return newState;

    case FETCH_FOODS_DETAILS: 
      newState.foodDetail = action.payload
      return newState

    default:
      return state;
  }
}
