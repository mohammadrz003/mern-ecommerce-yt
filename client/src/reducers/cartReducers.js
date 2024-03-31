import { createSlice } from "@reduxjs/toolkit";

// CART SLICE
const cartInitialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "PayPal",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    cartAddItem(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },
    cartRemoveItem(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    },
    cartSaveShippingAddress(state, action) {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    cartSavePeymentMethod(state, action) {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartReducer };
