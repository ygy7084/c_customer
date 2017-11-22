import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as mainReducer } from './scenes/Main/reducer';
import { reducer as orderedReducer } from './scenes/Ordered/reducer';
import { reducer as dataReducer } from './data/reducer';

export default combineReducers({
  routing: routerReducer,
  data: dataReducer,
  main: mainReducer,
  ordered: orderedReducer,
});
