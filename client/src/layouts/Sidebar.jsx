import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineClose,
} from "react-icons/ai";

import Cart from "../components/cart/Cart";
import { images } from "../constants";
import UserProfileButton from "../components/UserProfileButton";

const Sidebar = () => {
  const sideBarRef = useRef(null);
  const [menuIsShown, setMenuIsShown] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState(0);

  const toggleMenuHandler = () => {
    setMenuIsShown((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    setSideBarWidth(sideBarRef.current.clientWidth);
  }, []);

  return (
    <>
      <div
        ref={sideBarRef}
        className="sticky top-0 z-30 bg-palette-chineseBlack text-white lg:h-screen"
      >
        <div className="flex flex-row lg:flex-col justify-between items-center w-full h-full p-5">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <Link to="/">
              <img className="w-10 h-auto" src={images.logo} alt="logo" />
            </Link>
            <div className="flex items-center lg:hidden">
              <UserProfileButton />
            </div>
          </div>
          <div className="flex space-x-4 lg:space-x-0 items-center">
            <Cart className="lg:hidden" />
            <div>
              {!menuIsShown ? (
                <AiOutlineMenu
                  onClick={toggleMenuHandler}
                  className="w-8 h-8 cursor-pointer"
                />
              ) : (
                <AiOutlineClose
                  onClick={toggleMenuHandler}
                  className="w-8 h-8 cursor-pointer"
                />
              )}
            </div>
          </div>
          <ul className="hidden lg:block space-y-2">
            <li>
              <a
                href="https://twitter.com/mmdrz003"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineTwitter className="w-5 h-5 hover:scale-110" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mohammadrz003"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineGithub className="w-5 h-5 hover:scale-110" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/moonfo_dev/"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineInstagram className="w-5 h-5 hover:scale-110" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {menuIsShown && (
        <div
          className="hidden lg:block z-[49] absolute bg-white opacity-60 top-0 bottom-0 right-0"
          style={{ left: `${sideBarWidth}px` }}
          onClick={toggleMenuHandler}
        />
      )}
      {menuIsShown && (
        <div
          className={`hidden z-50 lg:flex items-center px-20 py-10 absolute top-0 bottom-0 w-1/3 h-full bg-palette-chineseBlack border-l border-l-[#202020]`}
          style={{ left: `${sideBarWidth}px` }}
        >
          <ul className="text-white uppercase font-normal text-4xl space-y-5">
            <li className="tracking-wider">
              <Link to="/">Shop</Link>
            </li>

            <li className="tracking-wider">
              <Link to="/about">About</Link>
            </li>

            <li className="tracking-wider">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
      {menuIsShown && (
        <div
          className={`flex lg:hidden justify-center items-center p-5 fixed left-0 right-0 top-[80px] bottom-0 bg-palette-chineseBlack z-[21] border-t border-t-[#202020]`}
        >
          <ul className="text-white uppercase font-normal text-center text-3xl space-y-5">
            <li className="tracking-wider">
              <Link to="/">Shop</Link>
            </li>

            <li className="tracking-wider">
              <Link to="/about">About</Link>
            </li>

            <li className="tracking-wider">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
