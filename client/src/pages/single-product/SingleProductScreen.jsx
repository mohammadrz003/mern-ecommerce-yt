import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import Header from "../../layouts/Header";
import Layout from "../../layouts/Layout";
import ProductDetail from "./container/ProductDetail";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import BackButton from "../../components/BackButton";
import { productCreateReviewActions } from "../../reducers/productReducers";
import Alert from "../../components/Alert";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SingleProductScreen = () => {
  const { id: productId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted!");
      setRating(0);
      setComment("");
      dispatch(productCreateReviewActions.productCreateReviewReset());
    }

    dispatch(listProductDetails(productId));
  }, [productId, dispatch, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <Layout>
      <Header className="justify-between">
        <BackButton url="/" text="BACK TO SHOP" />
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <button className="px-5 font-semibold py-6 lg:px-10">
            SHARE THIS
          </button>
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <main className="container mx-auto px-5 py-8 md:px-14 md:py-16">
        {loading ? (
          <div className="flex">
            <button className="mx-auto btn loading bg-transparent text-gray-700 border-none">
              Loading...
            </button>
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        ) : (
          <>
            <ProductDetail product={product} />
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              {product.reviews.length === 0 && (
                <Alert className="mt-5">No Reviews</Alert>
              )}
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id} className="flex flex-col mt-5">
                    <span className="font-semibold">{review.name}</span>
                    <Rating
                      className="flex items-center text-palette-chineseBlack"
                      initialRating={review.rating}
                      readonly={true}
                      fractions={2}
                      emptySymbol={<AiOutlineStar />}
                      fullSymbol={<AiFillStar />}
                    />
                    <p>{review.comment}</p>
                    <p className="text-xs">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </li>
                ))}
                <li className="mt-10">
                  <h2 className="text-2xl font-semibold mb-5">
                    Write a Customer Review
                  </h2>
                  {errorProductReview && (
                    <Alert variant="error" className="mb-5">
                      {errorProductReview}
                    </Alert>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="form-control">
                        <Rating
                          className="flex items-center text-palette-chineseBlack"
                          initialRating={rating}
                          readonly={false}
                          fractions={2}
                          emptySymbol={<AiOutlineStar />}
                          fullSymbol={<AiFillStar />}
                          onChange={(rateNumber) => setRating(rateNumber)}
                        />
                      </div>
                      <div className="form-control mt-3">
                        <textarea
                          className="textarea textarea-bordered"
                          placeholder="comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn mt-3"
                        disabled={loadingProductReview}
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Alert variant="warning" className="mt-5">
                      Please{" "}
                      <Link to="/login" className="link">
                        sign in
                      </Link>{" "}
                      to write a review
                    </Alert>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default SingleProductScreen;
