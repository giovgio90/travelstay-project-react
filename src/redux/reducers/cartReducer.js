import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "../actions";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case REMOVE_FROM_CART:
      const productId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== productId),
      };

    case UPDATE_QUANTITY:
      const { productId: updatedProductId, quantity: updatedQuantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === updatedProductId ? { ...item, quantity: updatedQuantity } : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
