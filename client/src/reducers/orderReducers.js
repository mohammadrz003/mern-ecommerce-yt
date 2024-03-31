import { createSlice } from "@reduxjs/toolkit";

// ORDER CREATE SLICE
const orderCreateInitialState = {};

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: orderCreateInitialState,
  reducers: {
    orderCreateRequest(state, action) {
      return { loading: true };
    },
    orderCreateSuccess(state, action) {
      return { loading: false, success: true, order: action.payload };
    },
    orderCreateFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

// ORDER DETAILS SLICE
const orderDetailsInitialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: orderDetailsInitialState,
  reducers: {
    orderDetailsRequest(state, action) {
      return { ...state, loading: true };
    },
    orderDetailsSuccess(state, action) {
      return { loading: false, order: action.payload };
    },
    orderDetailsFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

// ORDER PAY SLICE
const orderPayInitialState = {};

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: orderPayInitialState,
  reducers: {
    orderPayRequest(state, action) {
      return { loading: true };
    },
    orderPaySuccess(state, action) {
      return { loading: false, success: true };
    },
    orderPayFail(state, action) {
      return { loading: false, error: action.payload };
    },
    orderPayReset(state, action) {
      return {};
    },
  },
});

// ORDER DELIVER SLICE
const orderDeliverInitialState = {};

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: orderDeliverInitialState,
  reducers: {
    orderDeliverRequest(state, action) {
      return { loading: true };
    },
    orderDeliverSuccess(state, action) {
      return { loading: false, success: true };
    },
    orderDeliverFail(state, action) {
      return { loading: false, error: action.payload };
    },
    orderDeliverReset(state, action) {
      return {};
    },
  },
});

// ORDER LIST MY SLICE
const orderListMyInitialState = { orders: [] };

const orderListMySlice = createSlice({
  name: "orderListMy",
  initialState: orderListMyInitialState,
  reducers: {
    orderListMyRequest(state, action) {
      return { loading: true };
    },
    orderListMySuccess(state, action) {
      return { loading: false, orders: action.payload };
    },
    orderListMyFail(state, action) {
      return { loading: false, error: action.payload };
    },
    orderListMyReset(state, action) {
      return { orders: [] };
    },
  },
});

// ORDER LIST SLICE
const orderListInitialState = { orders: [] };

const orderListSlice = createSlice({
  name: "orderList",
  initialState: orderListInitialState,
  reducers: {
    orderListRequest(state, action) {
      return { loading: true };
    },
    orderListSuccess(state, action) {
      return { loading: false, orders: action.payload };
    },
    orderListFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

const orderCreateActions = orderCreateSlice.actions;
const orderCreateReducer = orderCreateSlice.reducer;
const orderDetailsActions = orderDetailsSlice.actions;
const orderDetailsReducer = orderDetailsSlice.reducer;
const orderPayActions = orderPaySlice.actions;
const orderPayReducer = orderPaySlice.reducer;
const orderListMyActions = orderListMySlice.actions;
const orderListMyReducer = orderListMySlice.reducer;
const orderListActions = orderListSlice.actions;
const orderListReducer = orderListSlice.reducer;
const orderDeliverActions = orderDeliverSlice.actions;
const orderDeliverReducer = orderDeliverSlice.reducer;

export {
  orderCreateActions,
  orderCreateReducer,
  orderDetailsActions,
  orderDetailsReducer,
  orderPayActions,
  orderPayReducer,
  orderListMyActions,
  orderListMyReducer,
  orderListActions,
  orderListReducer,
  orderDeliverActions,
  orderDeliverReducer,
};
