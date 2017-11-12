import { combineReducers } from 'redux';
import { reducer as orderReducer } from './order/reducer';

export const reducer = combineReducers({
  order: orderReducer,
});
