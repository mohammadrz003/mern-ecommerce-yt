import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "../../components/Loader";
import Alert from "../../components/Alert";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { getOrderDetails, deliverOrder } from "../../actions/orderActions";
import {
  orderPayActions,
  orderDeliverActions,
} from "../../reducers/orderReducers";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay || successDeliver) {
      dispatch(orderPayActions.orderPayReset());
      dispatch(orderDeliverActions.orderDeliverReset());
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDeliver,
    navigate,
    userInfo,
  ]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const payOrderHandler = async () => {
    setPaymentLoading(true);

    // request to the backend to create invoice and then redirect the user to the payment URL

    setPaymentLoading(false);
  };

  const deliverHandler = async () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Layout>
      <Header className="justify-end">
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <div className="py-10 px-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <div className="w-full flex flex-col lg:flex-row lg:justify-start lg:space-x-5 mt-5 lg:mt-10">
            <div className="flex-1">
              <h1 className="mb-7 text-2xl">Order {order._id}</h1>
              <div className="w-full pb-5 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Shipping</h2>
                <p className="mt-2">
                  <span className="font-semibold">Name:</span> {order.user.name}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Email:</span>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p className="my-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Alert variant="success">
                    Delivered on {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert variant="error">Not Delivered</Alert>
                )}
              </div>
              <div className="w-full py-5 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <p className="my-2">
                  <span className="font-semibold">Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Alert variant="success">Paid on {order.paidAt}</Alert>
                ) : (
                  <Alert variant="error">Not Paid</Alert>
                )}
              </div>
              <div className="w-full py-5 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Alert variant="error">Order is empty</Alert>
                ) : (
                  <section className="container px-4 mx-auto">
                    <div className="flex flex-col mt-6">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.orderItems.map((item, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                      <div className="inline-flex items-center gap-x-3">
                                        <div className="flex items-center gap-x-2">
                                          <img
                                            className="object-cover w-10 aspect-square"
                                            src={item.image}
                                            alt={item.name}
                                          />
                                          <div>
                                            <h2 className="font-medium text-gray-800">
                                              {item.name}
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
                                        <h2 className="text-sm font-normal">
                                          {item.qty} * {item.price} ={" "}
                                          {(item.qty * item.price).toFixed(2)}
                                        </h2>
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
                  </section>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col font-medium mt-8 lg:mt-0 lg:w-80">
              <div className="space-y-2">
                <div className="flex justify-between item-center">
                  <span className="text-gray-500">Items</span>
                  <span className="text-lime-700 font-bold">
                    ${addDecimals(order.itemsPrice)}
                  </span>
                </div>
                <div className="flex justify-between item-center">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-lime-700 font-bold">
                    ${addDecimals(order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between item-center">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-lime-700 font-bold">
                    ${addDecimals(order.taxPrice)}
                  </span>
                </div>
                <div className="flex justify-between item-center">
                  <span className="text-gray-500">Total</span>
                  <span className="text-lime-700 font-bold">
                    ${addDecimals(order.totalPrice)}
                  </span>
                </div>
              </div>
              {!order.isPaid && order.user._id === userInfo._id && (
                <button
                  type="button"
                  className="w-full text-white bg-black px-5 py-3 mt-4 disabled:opacity-70"
                  disabled={order.orderItems.length === 0 || paymentLoading}
                  onClick={payOrderHandler}
                >
                  Pay
                </button>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    type="button"
                    className="w-full text-white bg-green-500 px-5 py-3 mt-4 disabled:opacity-70"
                    disabled={loadingDeliver}
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderScreen;
