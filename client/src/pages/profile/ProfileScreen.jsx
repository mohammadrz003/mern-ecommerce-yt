import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";

import Alert from "../../components/Alert";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { listMyOrders } from "../../actions/orderActions";
import Loader from "../../components/Loader";

const ProfileScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userLoginInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setInputValues((curState) => {
          return { ...curState, name: user.name, email: user.email };
        });
      }
    }
  }, [navigate, userLoginInfo, dispatch, user.email, user.name]);

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
        updateUserProfile({
          id: user._id,
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
        })
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
      <section className="flex flex-col p-5 lg:flex-row lg:gap-x-7">
        <div className="w-full lg:w-3/12">
          <h2 className="text-3xl mb-6">User Profile</h2>
          <div className="flex flex-col space-y-2">
            {message && <Alert variant="error">{message}</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
            {success && <Alert variant="success">Profile Updated</Alert>}
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
            <button
              type="submit"
              disabled={loading}
              className="btn w-full mt-5"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
        <div className="w-full mt-10 lg:mt-0 lg:w-9/12">
          <h2 className="text-3xl mb-6">My Orders</h2>
          <div className="flex flex-col space-y-2">
            {errorOrders && <Alert variant="error">{errorOrders}</Alert>}
          </div>
          <div>
            {loadingOrders ? (
              <Loader />
            ) : (
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <span>ID</span>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <span>DATE</span>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <span>TOTAL</span>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              PAID
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              DELIVERED
                            </th>

                            <th
                              scope="col"
                              className="relative py-3.5 px-4"
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-medium text-gray-800">
                                        {order._id}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-medium text-gray-800">
                                        {order.createdAt.substring(0, 10)}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-medium text-gray-800">
                                        ${order.totalPrice}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-medium text-gray-800">
                                        {order.isPaid ? (
                                          order.paidAt.substring(0, 10)
                                        ) : (
                                          <RxCross1 className="text-red-500" />
                                        )}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-medium text-gray-800">
                                        {order.isDelivered ? (
                                          order.deliveredAt.substring(0, 10)
                                        ) : (
                                          <RxCross1 className="text-red-500" />
                                        )}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                <div class="flex items-center gap-x-6">
                                  <Link
                                    to={`/order/${order._id}`}
                                    class="text-gray-600 transition-colors duration-200 hover:text-green-500 focus:outline-none"
                                  >
                                    <AiOutlineEye className="h-5 w-auto" />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfileScreen;
