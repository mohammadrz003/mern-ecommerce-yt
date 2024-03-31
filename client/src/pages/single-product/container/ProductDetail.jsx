import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { screens } from "../../../constants";
import QuantityInput from "../../../components/cart/QuantityInput";

const ProductImages = styled.div`
  ${screens.lg(css`
    height: ${(props) => `${props.productImageHeight}px`};
  `)};
`;

const ProductSingleImage = styled.div`
  grid-row: 1;

  ${screens.lg(css`
    grid-row: auto;
  `)};
`;

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const ProductImagesContainerRef = useRef(null);
  const [productImageHeight, setProductImageHeight] = useState(0);
  const [error, setError] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setProductImageHeight(entries[0].contentRect.height);
    });
    observer.observe(ProductImagesContainerRef.current);
    return () =>
      ProductImagesContainerRef.current &&
      observer.unobserve(ProductImagesContainerRef.current);
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${productQuantity}`);
  };

  return (
    <>
      <section className="grid gap-y-5 lg:gap-x-10 lg:grid-cols-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 grid-flow-dense min-h-0">
          <ProductImages
            className="flex overflow-auto lg:flex-col lg:col-span-2 lg:overflow-y-auto"
            productImageHeight={productImageHeight}
          >
            {[...Array(5)].map((item, index) => (
              <img
                key={index}
                className="w-[22%] lg:w-full"
                src="/images/sample.jpg"
                alt="product"
              />
            ))}
          </ProductImages>
          <ProductSingleImage className="lg:col-span-10 border border-gray-200 h-fit">
            <img
              ref={ProductImagesContainerRef}
              className="w-full object-cover"
              src={product.image}
              alt="product_image"
            />
          </ProductSingleImage>
        </div>
        <div className="flex flex-col justify-center items-start lg:px-5">
          <h2 className="font-semibold uppercase text-lg xl:text-xl 2xl:text-2xl text-palette-chineseBlack">
            {product.name}
          </h2>
          <div className="flex items-center mt-3">
            <Rating
              className="flex items-center text-palette-chineseBlack"
              initialRating={product.rating}
              readonly={true}
              fractions={2}
              emptySymbol={<AiOutlineStar />}
              fullSymbol={<AiFillStar />}
            />
            <span className="block text-base font-medium text-palette-chineseBlack">
              ({product.numReviews} Reviews)
            </span>
          </div>
          <p className="text-palette-graniteGray mt-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas
            purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris
            rhoncus aenean vel elit scelerisque
          </p>
          <span className="font-bold text-palette-chineseBlack text-3xl mt-7">
            ${(Math.round(product.price * 100) / 100).toFixed(2)}
          </span>
          <div className="flex flex-wrap mt-7 gap-5">
            {product.countInStock > 0 ? (
              <>
                <QuantityInput
                  className="text-[1.4rem]"
                  productQuantity={productQuantity}
                  countInStock={product.countInStock}
                  setErrorFn={setError}
                  setProductQuantityFn={setProductQuantity}
                />
                <button
                  onClick={addToCartHandler}
                  className="py-3 px-6 bg-palette-chineseBlack text-white"
                >
                  ADD TO CART
                </button>
              </>
            ) : (
              <p className="text-red-500 font-semibold text-xl">Out Of Stock</p>
            )}
          </div>
          {error && error?.type === "IN_STOCK" && (
            <p className="text-red-500 text-xs mt-3">{error?.message}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
