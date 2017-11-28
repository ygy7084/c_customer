import { combineReducers } from 'redux';
import { reducer as getOrderedReducer } from './getOrdered/reducer';

export const reducer = combineReducers({
  getOrdered: getOrderedReducer,
});
