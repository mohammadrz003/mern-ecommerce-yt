import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Link to="/cart" className={`${props.className}`}>
      <div className="relative">
        <CgShoppingBag className="w-7 h-7" />
        <div className="min-w-[15px] min-h-[15px] flex justify-center items-center top-0 right-0 -translate-y-1/3 translate-x-1/4 absolute text-xs text-white bg-palette-chineseBlack">
          <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
