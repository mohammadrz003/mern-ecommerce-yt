import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { productUpdateActions } from "../../reducers/productReducers";

const ProductEditScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });
  const [uploading, setUploading] = useState(false);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  useEffect(() => {
    if (!userLoginInfo || !userLoginInfo?.isAdmin) {
      navigate("/login");
    }

    if (successUpdate) {
      dispatch(productUpdateActions.productUpdateReset());
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setInputValues({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [dispatch, navigate, userLoginInfo, product, productId, successUpdate]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, ...inputValues }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setInputValues((curState) => {
        return { ...curState, image: data };
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <Layout>
      <Header className="justify-between">
        <BackButton url="/admin/productlist" text="GO BACK" />
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <FormContainer className="py-10 px-5">
        <h1 className="text-3xl mb-6">Edit Product</h1>
        {errorUpdate && <Alert variant="error">{errorUpdate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                className="input input-bordered"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={inputValues.name}
                name="name"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                className="input input-bordered"
                id="price"
                type="number"
                placeholder="Enter price"
                value={inputValues.price}
                name="price"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="image">
                <span className="label-text">Image</span>
              </label>
              <input
                className="input input-bordered"
                id="image"
                type="text"
                placeholder="Enter image url"
                value={inputValues.image}
                name="image"
                onChange={inputChangeHandler}
              />
              <input
                type="file"
                className="file-input w-full max-w-xs"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="brand">
                <span className="label-text">Brand</span>
              </label>
              <input
                className="input input-bordered"
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={inputValues.brand}
                name="brand"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text">Category</span>
              </label>
              <input
                className="input input-bordered"
                id="category"
                type="text"
                placeholder="Enter category"
                value={inputValues.category}
                name="category"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="countInStock">
                <span className="label-text">Count In Stock</span>
              </label>
              <input
                className="input input-bordered"
                id="countInStock"
                type="number"
                placeholder="Enter count in stock"
                value={inputValues.countInStock}
                name="countInStock"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <input
                className="input input-bordered"
                id="description"
                type="text"
                placeholder="Enter description"
                value={inputValues.description}
                name="description"
                onChange={inputChangeHandler}
              />
            </div>
            <button
              type="submit"
              disabled={loadingUpdate}
              className="btn w-full mt-5"
            >
              {loadingUpdate ? "Loading..." : "Update"}
            </button>
          </form>
        )}
      </FormContainer>
    </Layout>
  );
};

export default ProductEditScreen;
