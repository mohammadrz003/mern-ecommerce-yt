import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import { register } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";

const RegisterScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";

  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userLoginInfo]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValues.password !== inputValues.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(
        register(inputValues.name, inputValues.email, inputValues.password)
      );
    }
  };

  return (
    <Layout>
      <Header className="justify-end">
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <FormContainer className="py-10 px-5">
        <h1 className="text-3xl mb-6">Sign Up</h1>
        <div className="space-y-2">
          {message && <Alert variant="error">{message}</Alert>}
          {error && <Alert variant="error">{error}</Alert>}
        </div>
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
            <label className="label" htmlFor="password">
              <span className="label-text">Pasword</span>
            </label>
            <input
              className="input input-bordered"
              id="password"
              type="password"
              placeholder="Enter password"
              value={inputValues.password}
              name="password"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              className="input input-bordered"
              id="confirmPassword"
              type="password"
              placeholder="Enter Confirm password"
              value={inputValues.confirmPassword}
              name="confirmPassword"
              onChange={inputChangeHandler}
            />
          </div>
          <button type="submit" disabled={loading} className="btn w-full mt-5">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="py-3">
          <div>
            Have an Account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="link"
            >
              Login
            </Link>
          </div>
        </div>
      </FormContainer>
    </Layout>
  );
};

export default RegisterScreen;
