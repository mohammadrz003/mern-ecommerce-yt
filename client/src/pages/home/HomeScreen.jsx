import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  BsFillGrid3X2GapFill,
  BsFillGridFill,
  BsGrid3X3GapFill,
} from "react-icons/bs";

import Cart from "../../components/cart/Cart";
import FilterProducts from "../../components/FilterProducts";
import Header from "../../layouts/Header";
import Layout from "../../layouts/Layout";
import ProductList from "./container/ProductList";
import UserProfileButton from "../../components/UserProfileButton";
import SearchBox from "../../components/SearchBox";
import { listProducts } from "../../actions/productActions";
import Pagination from "../../components/Pagination";

const viewModes = [
  {
    icon: BsFillGrid3X2GapFill,
    mode: "1",
  },
  {
    icon: BsFillGridFill,
    mode: "2",
  },
  {
    icon: BsGrid3X3GapFill,
    mode: "3",
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { page, pages } = productList;

  const [viewMode, setViewMode] = useState(viewModes[2].mode);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const changeViewModeHandler = (viewModeValue) => {
    setViewMode(viewModeValue);
  };

  let viewModeClasses = "";

  switch (viewMode) {
    case viewModes[0].mode:
      viewModeClasses = "grid grid-cols-2 gap-x-6 gap-y-10";
      break;
    case viewModes[1].mode:
      viewModeClasses =
        "grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:grid-cols-3";
      break;
    default:
      viewModeClasses =
        "grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:grid-cols-4";
      break;
  }

  return (
    <Layout>
      <Header className="flex flex-col-reverse gap-y-2 lg:flex-row lg:items-center lg:gap-x-5 lg:justify-between">
        <div className="w-full lg:max-w-sm">
          <SearchBox />
        </div>
        <div className="flex items-center justify-between divide-x divide-gray-200 border-x border-b border-gray-200">
          <FilterProducts
            activeViewMode={viewMode}
            viewModes={viewModes}
            onChangeViewMode={changeViewModeHandler}
          />
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <main className="container mx-auto px-5 py-8 md:px-14 md:py-16">
        <ProductList viewModeClasses={viewModeClasses} />
        <Pagination
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
          className="mt-10"
        />
      </main>
    </Layout>
  );
};

export default HomeScreen;
