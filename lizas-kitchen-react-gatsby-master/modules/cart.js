/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
import produce, { nothing } from 'immer';
import _ from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';
import { purgeStoredState } from 'redux-persist';
import js, { cl } from '../src/utils/devUtils';
import { persistConfig } from '../store';

// Fractal State

// Action Types
const ADD_DISH_TO_CART = 'ADD_DISH_TO_CART';
const REMOVE_DISH_FROM_CART = 'REMOVE_DISH_FROM_CART';
const ADD_QUANTITY_OF_DISH = 'ADD_QUANTITY_OF_DISH';
const SUBSTRACT_QUANTITY_OF_DISH = 'SUBSTRACT_QUANTITY_OF_DISH';
const GET_TOTAL_PRICE_OF_CART = 'GET_TOTAL_PRICE_OF_CART';
const SET_PLACEORDER_SECTION_VISIBLE = 'SET_PLACEORDER_SECTION_VISIBLE';
const SET_PLACEORDER_SECTION_INVISIBLE = 'SET_PLACEORDER_SECTION_INVISIBLE';
const RESET_LOCALSTORAGE = 'RESET_LOCALSTORAGE';
const RESET = 'RESET';

// Action creators
export const resetLocalStorage = () => {
  return {
    type: RESET_LOCALSTORAGE,
  };
};

export const addDishToCart = dish => {
  return {
    type: ADD_DISH_TO_CART,
    payload: { item: dish, quantity: 1 },
  };
};

export const getTotalPriceOfCart = () => {
  return {
    type: GET_TOTAL_PRICE_OF_CART,
  };
};

export const removeDishFromCart = dish => {
  return {
    type: REMOVE_DISH_FROM_CART,
    payload: { item: dish, quantity: 1 },
  };
};

export const addQuantityOfDish = dish => {
  return {
    type: ADD_QUANTITY_OF_DISH,
    payload: { item: dish },
  };
};

export const substractQuantityOfDish = dish => {
  return {
    type: SUBSTRACT_QUANTITY_OF_DISH,
    payload: { item: dish },
  };
};

export const setPlaceOrderSectionVisible = () => {
  return {
    type: SET_PLACEORDER_SECTION_VISIBLE,
  };
};

export const setPlaceOrderSectionInvisible = () => {
  return {
    type: SET_PLACEORDER_SECTION_INVISIBLE,
  };
};

const Reducer = (
  state = {
    cart: [],
    placeOrderSectionVisible: false,
  },
  action
) => {
  let checkingId;
  let priceCounter;
  let newState;
  return produce(state, draft => {
    switch (action.type) {
      case RESET_LOCALSTORAGE:
        return {
          cart: [],
          placeOrderSectionVisible: false,
        };

      case ADD_DISH_TO_CART:
        draft.cart.push({
          item: _.pick(action.payload.item, [
            'id',
            'dishName',
            'description',
            'price',
            'day',
          ]),
          quantity: action.payload.quantity,
        });
        return;
      case GET_TOTAL_PRICE_OF_CART:
        priceCounter = 0;
        draft.cart.forEach(cart => {
          priceCounter += cart.item.price * cart.quantity;
        });
        draft.cart.push({
          totalPrice: priceCounter,
        });
        return;
      case REMOVE_DISH_FROM_CART:
        checkingId = action.payload.item.id;
        newState = _.filter(draft.cart, c => {
          return c.item.id !== checkingId;
        });
        if (newState.length === 0) {
          return {
            cart: newState,
            placeOrderSectionVisible: false,
          };
        }
        return {
          cart: newState,
          placeOrderSectionVisible: draft.placeOrderSectionVisible,
        };
      case ADD_QUANTITY_OF_DISH:
        checkingId = action.payload.item.id;
        draft.cart.forEach((cart, index) => {
          if (cart.item.id === checkingId) {
            draft.cart[index].quantity += 1;
          }
        });
        return;
      case SUBSTRACT_QUANTITY_OF_DISH:
        checkingId = action.payload.item.id;
        draft.cart.forEach((cart, index) => {
          if (cart.item.id === checkingId && draft.cart[index].quantity > 1) {
            draft.cart[index].quantity -= 1;
          }
        });
        return;
      case SET_PLACEORDER_SECTION_VISIBLE:
        draft.placeOrderSectionVisible = true;
        return;

      case SET_PLACEORDER_SECTION_INVISIBLE:
        draft.placeOrderSectionInvisible = true;
    }
  });
};

// Selectors
const cart = state => state.cart.cart;
export const getCurrentCart = createSelector(
  [cart],
  cartArray => {
    return cartArray;
  }
);

const placeordersectionvisible = state => state.cart.placeordersectionvisible;
export const getPlaceOrderSectionVisibility = createSelector(
  [placeordersectionvisible],
  cartArray => {
    return cartArray.placeOrderSectionVisible;
  }
);

export default Reducer;
