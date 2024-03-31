import React from "react";
import styled from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const QuantityInputElement = styled.input`
  width: 100%;
  max-width: 2rem;
  text-align: center;
  border: none;
  outline: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const QuantityInput = ({
  className,
  productQuantity,
  countInStock,
  setErrorFn,
  setProductQuantityFn,
}) => {
  const changeQuantityHandler = (amount, type) => {
    setErrorFn(null);
    const value = +amount;
    if (!value) {
      setProductQuantityFn(1);
    }
    const invalidValueHandler = () =>
      setErrorFn({ type: "IN_STOCK", message: "Please enter a valid value." });
    const biggerThanInStockHandler = () =>
      setErrorFn({
        type: "IN_STOCK",
        message: "Amount cannot be bigger than count in stock",
      });
    switch (type) {
      case "CUSTOM": {
        if (value <= 0) {
          invalidValueHandler();
          break;
        } else if (value > countInStock) {
          biggerThanInStockHandler();
          break;
        }
        setProductQuantityFn(value);
        break;
      }
      case "INCREASE": {
        if (productQuantity + value > countInStock) {
          biggerThanInStockHandler();
          break;
        }
        setProductQuantityFn((prevState) => prevState + value);
        break;
      }
      case "DECREASE": {
        if (productQuantity - value <= 0) {
          break;
        }
        setProductQuantityFn((prevState) => prevState - value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={`${className} w-fit flex items-center border border-gray-200 rounded-md overflow-hidden`}>
      <button
        className="p-3 disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={productQuantity === 1}
        onClick={() => changeQuantityHandler(1, "DECREASE")}
      >
        <AiOutlineMinus />
      </button>
      <QuantityInputElement
        value={productQuantity}
        onChange={(e) => changeQuantityHandler(e.target.value, "CUSTOM")}
        min="1"
        max={countInStock}
        type="number"
      />
      <button
        className="p-3 disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={productQuantity === countInStock}
        onClick={() => changeQuantityHandler(1, "INCREASE")}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default QuantityInput;
