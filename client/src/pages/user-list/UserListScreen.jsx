import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import { listUsers, deleteUser } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure that you want to delete ${name}`)) {
      dispatch(deleteUser(id));
    }
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
        <h1 className="text-2xl mb-5 font-semibold">Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
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
                          <span>EMAIL</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        ADMIN
                      </th>

                      <th scope="col" className="relative py-3.5 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800">
                                  {user._id}
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
                                  {user.name}
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
                                  <a href={`mailto:${user.email}`}>
                                    {user.email}
                                  </a>
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
                                  {user.isAdmin ? (
                                    <BsCheckLg className="text-green-500" />
                                  ) : (
                                    <RxCross1 className="text-red-500" />
                                  )}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div class="flex space-x-2 items-center gap-x-6">
                            <Link
                              to={`/admin/user/${user._id}/edit`}
                              class="text-gray-600 transition-colors duration-200 hover:text-green-500 focus:outline-none"
                            >
                              <AiOutlineEdit className="h-5 w-auto" />
                            </Link>
                            <button
                              onClick={() => deleteHandler(user._id, user.name)}
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
        )}
      </section>
    </Layout>
  );
};

export default UserListScreen;
