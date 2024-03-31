import React from "react";

const FormContainer = ({ children, className }) => {
  return (
    <section>
      <div className={`w-full flex justify-center ${className}`}>
        <div className="w-full md:w-1/2">{children}</div>
      </div>
    </section>
  );
};

export default FormContainer;
