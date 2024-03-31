import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-full flex items-center justify-between font-semibold text-xs lg:text-base">
      {step1 ? (
        <Link to="/login" className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-[#0868F5] rounded-full text-center text-white flex justify-center items-center">
            1
          </div>
          <span>Sign In</span>
        </Link>
      ) : (
        <button disabled className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-gray-400 rounded-full text-center text-white flex justify-center items-center">
            1
          </div>
          <span>Sign In</span>
        </button>
      )}
      <MdOutlineKeyboardArrowRight className="w-6 h-auto text-gray-400" />
      {step2 ? (
        <Link to="/shipping" className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-[#0868F5] rounded-full text-center text-white flex justify-center items-center">
            2
          </div>
          <span>Shipping</span>
        </Link>
      ) : (
        <button disabled className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-gray-400 rounded-full text-center text-white flex justify-center items-center">
            2
          </div>
          <span>Shipping</span>
        </button>
      )}
      <MdOutlineKeyboardArrowRight className="w-6 h-auto text-gray-400" />
      {step3 ? (
        <Link to="/payment" className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-[#0868F5] rounded-full text-center text-white flex justify-center items-center">
            3
          </div>
          <span>Payment</span>
        </Link>
      ) : (
        <button disabled className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-gray-400 rounded-full text-center text-white flex justify-center items-center">
            3
          </div>
          <span>Payment</span>
        </button>
      )}
      <MdOutlineKeyboardArrowRight className="w-6 h-auto text-gray-400" />
      {step4 ? (
        <Link to="/placeorder" className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-[#0868F5] rounded-full text-center text-white flex justify-center items-center">
            4
          </div>
          <span>Place Order</span>
        </Link>
      ) : (
        <button disabled className="flex items-center space-x-1.5 lg:space-x-2">
          <div className="w-4 lg:w-6 aspect-square bg-gray-400 rounded-full text-center text-white flex justify-center items-center">
            4
          </div>
          <span>Place Order</span>
        </button>
      )}
    </div>
  );
};

export default CheckoutSteps;
