import React from "react";

const Header = (props) => {
  return (
    <header className="sticky lg:top-0 bg-white z-[2]">
      <div className={`container mx-auto flex px-2.5 lg:px-14 ${props.className}`}>
        {props.children}
      </div>
    </header>
  );
};

export default Header;
