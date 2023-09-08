import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import foodReducer from './foodReducer'

export const rootReducer = combineReducers({
  category: categoryReducer,
  food: foodReducer
})