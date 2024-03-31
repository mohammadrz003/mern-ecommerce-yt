import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import { login } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";

const LoginScreen = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect")
    ? "/" + searchParams.get("redirect")
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(inputValues.email, inputValues.password));
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
        <h1 className="text-3xl mb-6">Sign In</h1>
        {error && <Alert variant="error">{error}</Alert>}
        <form onSubmit={submitHandler}>
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
          <button type="submit" disabled={loading} className="btn w-full mt-5">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="py-3">
          <div>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="link"
            >
              Register
            </Link>
          </div>
        </div>
      </FormContainer>
    </Layout>
  );
};

export default LoginScreen;
