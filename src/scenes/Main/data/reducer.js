import { combineReducers } from 'redux';
import { reducer as orderReducer } from './order/reducer';
import { reducer as productReducer } from './product/reducer';
import { reducer as shopReducer } from './shop/reducer';
import { reducer as nfcReducer } from './nfc/reducer';
import { reducer as customerReducer } from './customer/reducer';
import { reducer as socketReducer } from './socket/reducer';
import { reducer as webPushReducer } from './webPush/reducer';

export const reducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  shop: shopReducer,
  nfc: nfcReducer,
  customer: customerReducer,
  socket: socketReducer,
  webPush: webPushReducer,
});
