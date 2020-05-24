import {DECREASE_QUANTITY, REMOVE_CART_ITEM} from '../actions/type';

let initialState = [];

const reducer = (state = initialState, action) => {
  //xử lý action
  switch (action.type) {
    case 'ADD_TO_CART': {
      //1. kiểm tra sản phẩm tồn chưa trong cart chưa
      const index = state.findIndex(
        (item) => item.product.id === action.payload.id,
      );

      // Nếu chưa có thì push mới
      if (index === -1) {
        const cartItem = {
          product: action.payload,
          quantity: 1,
        };
        state.push(cartItem);
      }

      //nếu có rồi thay đổi quantity
      else {
        state[index].quantity++;
      }
      //immutable
      return [...state];
    }

    case 'INCREASE_QUANTITY': {
      //tìm vị trí sản phẩm muốn tăng số lượng
      const index = state.findIndex(
        (item) => item.product.id === action.payload,
      );
      state[index] = {...state[index], quantity: ++state[index].quantity};
      // => state = [cartItem, cartItem]

      // const cloneCartItem = {...state[index]};
      // cloneCartItem.quantity++;

      // state[index] = cloneCartItem;

      return [...state];
    }

    case DECREASE_QUANTITY: {
      //tìm vị trí sản phẩm muốn tăng số lượng
      const index = state.findIndex(
        (item) => item.product.id === action.payload,
      );
      state[index] = {...state[index], quantity: --state[index].quantity};
      // => state = [cartItem, cartItem]

      // const cloneCartItem = {...state[index]};
      // cloneCartItem.quantity++;

      // state[index] = cloneCartItem;

      return [...state];
    }

    case REMOVE_CART_ITEM: {
      const index = state.findIndex(
        (item) => item.product.id === action.payload.id,
      );
      state.splice(index, 1);
      //Xoá xong, call cb

      action.payload.cb && action.payload.cb();

      return [...state];
    }

    default:
      return state;
  }
};

export default reducer;
