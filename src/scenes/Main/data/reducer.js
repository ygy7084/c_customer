import { combineReducers } from 'redux';
import { reducer as orderReducer } from './order/reducer';
import { reducer as productReducer } from './product/reducer';

export const reducer = combineReducers({
  order: orderReducer,
  product: productReducer,
});
