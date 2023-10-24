import {
  ADD_TO_CART_ROOM,
  ADD_TO_CART_STAY,
  ADD_TO_CART_TOUR,
  ADD_TO_CART_TRAVEL,
  REMOVE_FROM_CART_ROOM,
  REMOVE_FROM_CART_STAY,
  REMOVE_FROM_CART_TOUR,
  REMOVE_FROM_CART_TRAVEL,
} from "../actions";

const initialState = {
  cartItemsTravel: [],
  cartItemsStay: [],
  cartItemsRoom: [],
  cartItemsTour: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_TRAVEL:
      const newItemTravel = action.payload;
      const existingItemTravel = state.cartItemsTravel.find((item) => item.id === newItemTravel.id);

      if (existingItemTravel) {
        return {
          ...state,
          cartItemsTravel: state.cartItemsTravel.map((item) =>
            item.id === newItemTravel.id ? { ...item, quantity: item.quantity + newItemTravel.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItemsTravel: [...state.cartItemsTravel, newItemTravel],
        };
      }

    case ADD_TO_CART_STAY:
      const newItemStay = action.payload;
      const existingItemStay = state.cartItemsStay.find((item) => item.id === newItemStay.id);

      if (existingItemStay) {
        return {
          ...state,
          cartItemsStay: state.cartItemsStay.map((item) =>
            item.id === newItemStay.id ? { ...item, quantity: item.quantity + newItemStay.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItemsStay: [...state.cartItemsStay, newItemStay],
        };
      }

    case ADD_TO_CART_ROOM:
      const newItemRoom = action.payload;
      const existingItemRoom = state.cartItemsRoom.find((item) => item.id === newItemRoom.id);

      if (existingItemRoom) {
        return {
          ...state,
          cartItemsRoom: state.cartItemsRoom.map((item) =>
            item.id === newItemRoom.id ? { ...item, quantity: item.quantity + newItemRoom.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItemsRoom: [...state.cartItemsRoom, newItemRoom],
        };
      }

    case ADD_TO_CART_TOUR:
      const newItemTour = action.payload;
      const existingItemTour = state.cartItemsTour.find((item) => item.id === newItemTour.id);

      if (existingItemTour) {
        return {
          ...state,
          cartItemsTour: state.cartItemsTour.map((item) =>
            item.id === newItemTour.id ? { ...item, quantity: item.quantity + newItemTour.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItemsRoom: [...state.cartItemsRoom, newItemRoom],
        };
      }

    case REMOVE_FROM_CART_TRAVEL:
      const productIdTravel = action.payload;
      return {
        ...state,
        cartItemsTravel: state.cartItemsTravel.filter((item) => item.id !== productIdTravel),
      };

    case REMOVE_FROM_CART_STAY:
      const productIdStay = action.payload;
      return {
        ...state,
        cartItemsStay: state.cartItemsStay.filter((item) => item.id !== productIdStay),
      };

    case REMOVE_FROM_CART_ROOM:
      const productIdRoom = action.payload;
      return {
        ...state,
        cartItemsRoom: state.cartItemsRoom.filter((item) => item.id !== productIdRoom),
      };

    case REMOVE_FROM_CART_TOUR:
      const productIdTour = action.payload;
      return {
        ...state,
        cartItemsTour: state.cartItemsTour.filter((item) => item.id !== productIdTour),
      };

    default:
      return state;
  }
};

export default cartReducer;
