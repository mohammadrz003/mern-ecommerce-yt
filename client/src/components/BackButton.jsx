import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ url, text }) => {
  return (
    <Link
      to={url}
      className="px-5 flex font-semibold py-6 lg:px-10 border border-gray-200 items-center space-x-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>{text}</span>
    </Link>
  );
};

export default BackButton;
