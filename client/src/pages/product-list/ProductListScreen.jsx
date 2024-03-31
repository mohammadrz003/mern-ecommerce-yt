import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import Pagination from "../../components/Pagination";
import UserProfileButton from "../../components/UserProfileButton";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { productCreateActions } from "../../reducers/productReducers";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(productCreateActions.productCreateReset());
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    createdProduct?._id,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure that you want to delete ${name}`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Layout>
      <Header className="justify-end">
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <section className="flex flex-col p-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-semibold">Products</h1>
          <button
            onClick={createProductHandler}
            className="btn btn-sm text-xs lg:btn-md space-x-1"
          >
            <FiPlus />
            <span>CREATE PRODUCT</span>
          </button>
        </div>
        {loadingDelete && <Loader />}
        {errorDelete && <Alert variant="error">{errorDelete}</Alert>}
        {loadingCreate && <Loader />}
        {errorCreate && <Alert variant="error">{errorCreate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <>
            <div className="-my-2 overflow-x-auto w-full">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>ID</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>NAME</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>PRICE</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          CATEGORY
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          BRAND
                        </th>

                        <th scope="col" className="relative py-3.5 px-4"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800">
                                    {product._id}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800">
                                    {product.name}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800">
                                    ${product.price}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800">
                                    {product.category}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800">
                                    {product.brand}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm whitespace-nowrap">
                            <div class="flex space-x-2 items-center gap-x-6">
                              <Link
                                to={`/admin/product/${product._id}/edit`}
                                class="text-gray-600 transition-colors duration-200 hover:text-green-500 focus:outline-none"
                              >
                                <AiOutlineEdit className="h-5 w-auto" />
                              </Link>
                              <button
                                onClick={() =>
                                  deleteHandler(product._id, product.name)
                                }
                              >
                                <AiOutlineDelete className="h-5 w-auto text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Pagination pages={pages} page={page} className="mt-5" isAdmin={true} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default ProductListScreen;
