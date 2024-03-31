import axios from "axios";
import { orderListMyActions } from "../reducers/orderReducers";

import {
  userDeleteActions,
  userDetailsActions,
  userListActions,
  userLoginActions,
  userRegisterActions,
  userUpdateActions,
  userUpdateProfileActions,
} from "../reducers/userReducers";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginActions.userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch(userLoginActions.userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginActions.userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLoginActions.userLogout());
  dispatch(userDetailsActions.userDetailsReset());
  dispatch(orderListMyActions.orderListMyReset());
  dispatch(userListActions.userListReset());
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterActions.userRegisterRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch(userRegisterActions.userRegisterSuccess(data));
    dispatch(userLoginActions.userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userRegisterActions.userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsActions.userDetailsRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch(userDetailsActions.userDetailsSuccess(data));
  } catch (error) {
    dispatch(
      userDetailsActions.userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileActions.userUpdateProfileRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch(userUpdateProfileActions.userUpdateProfileSuccess(data));
    dispatch(userDetailsActions.userDetailsSuccess(data));
  } catch (error) {
    dispatch(
      userUpdateProfileActions.userUpdateProfileFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListActions.userListRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch(userListActions.userListSuccess(data));
  } catch (error) {
    dispatch(
      userListActions.userListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteActions.userDeleteRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch(userDeleteActions.userDeleteSuccess());
  } catch (error) {
    dispatch(
      userDeleteActions.userDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateActions.userUpdateRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch(userUpdateActions.userUpdateSuccess());
    dispatch(userDetailsActions.userDetailsSuccess(data));
  } catch (error) {
    dispatch(
      userUpdateActions.userUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
