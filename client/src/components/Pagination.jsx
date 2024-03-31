import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  className = "",
}) => {
  return (
    pages > 1 && (
      <div class={`flex justify-center ${className}`}>
        {page === 1 ? (
          <span class="select-none flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed">
            Previous
          </span>
        ) : (
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page - 1}`
                  : `/page/${page - 1}`
                : `/admin/productlist/${page - 1}`
            }
            class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md"
          >
            Previous
          </Link>
        )}

        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
            class={`${
              x + 1 === page
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700"
            } items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex`}
          >
            {x + 1}
          </Link>
        ))}
        {page === pages ? (
          <span class="select-none flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed">
            Next
          </span>
        ) : (
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`
            }
            class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md"
          >
            Next
          </Link>
        )}
      </div>
    )
  );
};

export default Pagination;
