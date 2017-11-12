import _ from 'lodash';

import { reducer as dataReducer } from './data/reducer';

const initialState = {};
export const reducer = (state = initialState, action) => {
  const rest = _.omit(state, Object.keys(initialState));
  switch (action.type) {
    default:
      return {
        ...state,
        data: dataReducer(rest.data, action),
      };
  }
};
