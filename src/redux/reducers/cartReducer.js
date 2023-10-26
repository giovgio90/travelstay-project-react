import {
  ADD_TO_CART_DELUXE,
  ADD_TO_CART_ROOM,
  ADD_TO_CART_STAY,
  ADD_TO_CART_TOUR,
  ADD_TO_CART_TRAVEL,
  REMOVE_FROM_CART_DELUXE,
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
  cartItemsDeluxe: [],
};

const cartReducer = (state = initialState, action) => {
  let newItemTravel,
    existingItemTravel,
    newItemStay,
    existingItemStay,
    newItemRoom,
    existingItemRoom,
    newItemTour,
    existingItemTour,
    newItemDeluxe,
    existingItemDeluxe;

  switch (action.type) {
    case ADD_TO_CART_TRAVEL:
      newItemTravel = action.payload;
      existingItemTravel = state.cartItemsTravel.find((item) => item.id === newItemTravel.id);

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
      newItemStay = action.payload;
      existingItemStay = state.cartItemsStay.find((item) => item.id === newItemStay.id);

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
      newItemRoom = action.payload;
      existingItemRoom = state.cartItemsRoom.find((item) => item.id === newItemRoom.id);

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
      newItemTour = action.payload;
      existingItemTour = state.cartItemsTour.find((item) => item.id === newItemTour.id);

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
          cartItemsTour: [...state.cartItemsTour, newItemTour],
        };
      }

    case ADD_TO_CART_DELUXE:
      newItemDeluxe = action.payload;
      existingItemDeluxe = state.cartItemsDeluxe.find((item) => item.id === newItemDeluxe.id);

      if (existingItemDeluxe) {
        return {
          ...state,
          cartItemsDeluxe: state.cartItemsDeluxe.map((item) =>
            item.id === newItemDeluxe.id ? { ...item, quantity: item.quantity + newItemDeluxe.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItemsDeluxe: [...state.cartItemsDeluxe, newItemDeluxe],
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

    case REMOVE_FROM_CART_DELUXE:
      const productIdDeluxe = action.payload;
      return {
        ...state,
        cartItemsDeluxe: state.cartItemsDeluxe.filter((item) => item.id !== productIdDeluxe),
      };

    default:
      return state;
  }
};

export default cartReducer;
