import React from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:h-screen overflow-y-auto justify-between">
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
