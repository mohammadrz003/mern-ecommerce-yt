import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose, AiOutlineStar, AiFillStar } from "react-icons/ai";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../../actions/cartActions";

import QuantityInput from "../../../components/cart/QuantityInput";

const CartProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(item.qty);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(addToCart(item.product, productQuantity));
  }, [dispatch, item.product, productQuantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <tr className="font-semibold">
      <td>
        <div className="w-fit flex items-center gap-x-7">
          <button onClick={() => removeFromCartHandler(item.product)}>
            <AiOutlineClose className="text-red-500" />
          </button>

          <img
            className="w-20 aspect-square border border-gray-200"
            src={item.image}
            alt="product"
          />
          <div className="space-y-2">
            <h4 className="lg:text-lg">
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </h4>
            <Rating
              className="flex items-center text-palette-chineseBlack"
              initialRating={item.rating}
              readonly={true}
              fractions={2}
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
            />
          </div>
        </div>
      </td>
      <td>${item.price}</td>
      <td>
        <div className="flex flex-col">
          <QuantityInput
            className="text-lg"
            productQuantity={item.qty}
            countInStock={item.countInStock}
            setErrorFn={setError}
            setProductQuantityFn={setProductQuantity}
          />
          {error && error?.type === "IN_STOCK" && (
            <p className="text-red-500 text-xs mt-3">{error?.message}</p>
          )}
        </div>
      </td>
      <td>${(item.price * item.qty).toFixed(2)}</td>
    </tr>
  );
};

export default CartProductItem;
