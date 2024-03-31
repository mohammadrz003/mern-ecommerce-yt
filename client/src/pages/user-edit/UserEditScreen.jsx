import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { userUpdateActions } from "../../reducers/userReducers";

const UserEditScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userLoginInfo || !userLoginInfo?.isAdmin) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch(userUpdateActions.userUpdateReset());
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setInputValues({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [
    dispatch,
    user._id,
    user.email,
    user.isAdmin,
    user.name,
    userId,
    navigate,
    userLoginInfo,
    successUpdate,
  ]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, ...inputValues }));
  };

  return (
    <Layout>
      <Header className="justify-between">
        <BackButton url="/admin/userlist" text="GO BACK" />
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <FormContainer className="py-10 px-5">
        <h1 className="text-3xl mb-6">Edit User</h1>
        {errorUpdate && <Alert variant="error">{errorUpdate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                className="input input-bordered"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={inputValues.name}
                name="name"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                className="input input-bordered"
                id="email"
                type="email"
                placeholder="Enter email"
                value={inputValues.email}
                name="email"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="cursor-pointer label flex justify-start gap-x-3">
                <span className="label-text">Is Admin</span>
                <input
                  type="checkbox"
                  checked={inputValues.isAdmin}
                  className="checkbox checkbox-accent"
                  onChange={(e) =>
                    setInputValues((curState) => {
                      return { ...curState, isAdmin: e.target.checked };
                    })
                  }
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loadingUpdate}
              className="btn w-full mt-5"
            >
              {loadingUpdate ? "Loading..." : "Update"}
            </button>
          </form>
        )}
      </FormContainer>
    </Layout>
  );
};

export default UserEditScreen;
