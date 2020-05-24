import {combineReducers} from 'redux';
import productReducer from './product';
import cartReducer from './cart';
const reducer = combineReducers({
  //toàn bộ dữ liệu lưu trữ tại đây
  // tenDuLieu: reducerCon
  product: productReducer,
  cart: cartReducer,
});

export default reducer;
