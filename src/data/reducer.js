import { combineReducers } from 'redux';

import { reducer as loaderReducer } from './loader/reducer';
import { reducer as noticeDialogReducer } from './noticeDialog/reducer';

export const reducer = combineReducers({
  loader: loaderReducer,
  noticeDialog: noticeDialogReducer,
});
