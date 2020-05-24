import {SET_MOVIES} from '../actions/type';

const initialState = [];

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_MOVIES: {
      console.log(payload);
      return payload;
    }
    default:
      return state;
  }
};

export default reducer;
