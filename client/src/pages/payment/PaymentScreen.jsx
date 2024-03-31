import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";

import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import Header from "../../layouts/Header";
import Layout from "../../layouts/Layout";
import FormContainer from "../../components/FormContainer";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/cart/CheckoutSteps";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: paymentMethodState } = cart;

  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodState ? paymentMethodState : "Cryptocurrency"
  );

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/payment");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
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
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-3xl mb-6 mt-8">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-5">
            <button
              type="button"
              disabled={true}
              onClick={() => setPaymentMethod("Fiat")}
              className={`border ${
                paymentMethod === "Fiat"
                  ? "border-blue-500 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                  : "border-gray-800"
              } rounded-sm flex flex-col gap-y-2 justify-center items-center p-5 relative disabled:cursor-not-allowed`}
            >
              {paymentMethod === "Fiat" && (
                <AiFillCheckCircle className="absolute right-[10px] top-[8%] text-blue-500" />
              )}
              <AiFillDollarCircle className="h-10 w-auto" />
              <span className="text-gray-600">Fiat currency</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("Cryptocurrency")}
              className={`border ${
                paymentMethod === "Cryptocurrency"
                  ? "border-blue-500 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                  : "border-gray-800"
              } rounded-sm flex flex-col gap-y-2 justify-center items-center p-5 relative`}
            >
              {paymentMethod === "Cryptocurrency" && (
                <AiFillCheckCircle className="absolute right-[10px] top-[8%] text-blue-500" />
              )}
              <FaBitcoin className="h-10 w-auto" />
              <span className="text-gray-600">Cryptocurrency</span>
            </button>
          </div>
          <button type="submit" className="btn w-full mt-5">
            Continue
          </button>
        </form>
      </FormContainer>
    </Layout>
  );
};

export default PaymentScreen;
