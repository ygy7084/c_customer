import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth/reducer';
import { reducer as loaderReducer } from './loader/reducer';
import { reducer as noticeDialogReducer } from './noticeDialog/reducer';

export const reducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  noticeDialog: noticeDialogReducer,
});
