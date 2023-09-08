import { FETCH_CATEGORY } from "../actions/actionType";

const initialState = {
  categories: [],
};

export default function categoryReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case FETCH_CATEGORY:
      newState.categories = action.payload;
      return newState;

    default:
      return state;
  }
}
