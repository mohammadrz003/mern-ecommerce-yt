import React from "react";
import { useSelector } from "react-redux";

import CartProductItem from "./CartProductItem";

const CartProductList = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="overflow-x-auto flex-1">
      <table className="table table-compact w-full z-0">
        <thead>
          <tr>
            <th className="text-center">PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartProductItem key={item.product} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartProductList;
