import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../../components/cart/CheckoutSteps";
import Alert from "../../components/Alert";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { createOrder } from "../../actions/orderActions";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = 0;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
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
        <div className="w-full md:w-1/2 mx-auto">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-start lg:space-x-5 mt-5 lg:mt-10">
          <div className="flex-1">
            <div className="w-full pb-5 border-b border-gray-300">
              <h2 className="text-xl font-semibold">Shipping</h2>
              <p className="mt-2">
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
            <div className="w-full py-5 border-b border-gray-300">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p className="mt-2">Method: {paymentMethod}</p>
            </div>
            <div className="w-full py-5 border-b border-gray-300">
              <h2 className="text-xl font-semibold">Order Items</h2>
              {cartItems.length === 0 ? (
                <Alert variant="error">Your cart is empty</Alert>
              ) : (
                <section className="container px-4 mx-auto">
                  <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                              {cartItems.map((item, index) => (
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
                  ${addDecimals(itemsPrice)}
                </span>
              </div>
              <div className="flex justify-between item-center">
                <span className="text-gray-500">Shipping</span>
                <span className="text-lime-700 font-bold">
                  ${addDecimals(shippingPrice)}
                </span>
              </div>
              <div className="flex justify-between item-center">
                <span className="text-gray-500">Tax</span>
                <span className="text-lime-700 font-bold">
                  ${addDecimals(taxPrice)}
                </span>
              </div>
              <div className="flex justify-between item-center">
                <span className="text-gray-500">Total</span>
                <span className="text-lime-700 font-bold">
                  ${addDecimals(totalPrice)}
                </span>
              </div>
            </div>
            {error && <Alert variant="error">{error}</Alert>}
            <button
              className="w-full text-white bg-black px-5 py-3 mt-4"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceOrderScreen;
