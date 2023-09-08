import { combineReducers } from "redux";
import foodReducer from "./foods";
import categoryReducer  from "./categories";

export const rootReducer = combineReducers({
  food: foodReducer,
  category: categoryReducer
})

