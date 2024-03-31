import React from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Alert = ({ variant, className = "", children }) => {
  let alertVariantClass = "";
  let alertVariantIcon;

  switch (variant) {
    case "info":
      alertVariantClass = "alert-info";
      alertVariantIcon = (
        <AiOutlineInfoCircle className="w-6 h-6 text-gray-900" />
      );
      break;
    case "success":
      alertVariantClass = "alert-success";
      alertVariantIcon = (
        <AiOutlineCheckCircle className="w-6 h-6 text-gray-900" />
      );
      break;
    case "warning":
      alertVariantClass = "alert-warning";
      alertVariantIcon = <AiOutlineWarning className="w-6 h-6 text-gray-900" />;
      break;
    case "error":
      alertVariantClass = "alert-error";
      alertVariantIcon = (
        <AiOutlineCloseCircle className="w-6 h-6 text-gray-900" />
      );
      break;
    default:
      alertVariantIcon = (
        <AiOutlineInfoCircle className="w-6 h-6 text-blue-500" />
      );
      break;
  }
  return (
    <div className={`alert ${alertVariantClass} shadow-lg ${className}`}>
      <div>
        {alertVariantIcon}
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Alert;
