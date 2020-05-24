import {combineReducers} from 'redux';
import movies from './movie';
import userInfo from './userInfo';

const rootReducer = combineReducers({
  //toàn bộ data(state) chứa ở đây
  movies,
  userInfo,
});

export default rootReducer;
