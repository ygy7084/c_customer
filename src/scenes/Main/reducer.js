import { combineReducers } from 'redux';
import { reducer as accountReducer } from './account/reducer';
import { reducer as shopReducer } from './shop/reducer';
import { reducer as pictureReducer } from './picture/reducer';

export const reducer = combineReducers({
  account: accountReducer,
  shop: shopReducer,
  picture: pictureReducer,
});
