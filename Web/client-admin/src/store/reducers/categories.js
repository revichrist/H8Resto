import { FETCH_CATEGORIES, FETCH_CATEGORY_DETAIL } from "../actions/actionType";
const initialState = {
  categories: [],
  categoryDetail: {},
};

export default function categoryReducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case FETCH_CATEGORIES:
      newState.categories = action.payload;
      return newState;

    case FETCH_CATEGORY_DETAIL:
      newState.categoryDetail = action.payload;
      return newState;

    default:
      return state;
  }
}
