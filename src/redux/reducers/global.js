import createReducer from '../../core/createReducer';
import * as constant from '../constant';

const initialState = {
  name: 'pmm1',
};

export default createReducer(initialState, {
  [constant.SET_NAME](state, action) {
    return {
      ...state,
      name: action.data,
    };
  },
  [constant.UPDATE_NAME](state, action) {
    return {
      ...state,
      name: action.data,
    };
  },
});
