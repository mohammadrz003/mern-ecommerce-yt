import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f2]">
      <div className="container mx-auto px-5 py-8 md:px-14 lg:py-20 grid grid-cols-2 gap-y-6 lg:grid-cols-4 gap-x-5">
        <div>
          <h4 className="uppercase font-bold text-lg text-palette-chineseBlack mb-4">
            Los angeles
          </h4>
          <div className="flex flex-col text-palette-graniteGray font-normal gap-y-2">
            <address>
              145 Oliveska Street,
              <br />
              Los angeles, LA 90003
            </address>
            <a href="tell:+44987065901">+44 987 065 901</a>
            <a href="mailto:info@Example.com">info@Example.com</a>
          </div>
        </div>
        <div>
          <h4 className="uppercase font-bold text-lg text-palette-chineseBlack mb-4">
            Los angeles
          </h4>
          <div className="flex flex-col text-palette-graniteGray font-normal gap-y-2">
            <address>
              145 Oliveska Street,
              <br />
              Los angeles, LA 90003
            </address>
            <a href="tell:+44987065901">+44 987 065 901</a>
            <a href="mailto:info@Example.com">info@Example.com</a>
          </div>
        </div>
        <div>
          <h4 className="uppercase font-bold text-lg text-palette-chineseBlack mb-4">
            Los angeles
          </h4>
          <div className="flex flex-col text-palette-graniteGray font-normal gap-y-2">
            <address>
              145 Oliveska Street,
              <br />
              Los angeles, LA 90003
            </address>
            <a href="tell:+44987065901">+44 987 065 901</a>
            <a href="mailto:info@Example.com">info@Example.com</a>
          </div>
        </div>
        <div>
          <h4 className="uppercase font-bold text-lg text-palette-chineseBlack mb-4">
            Follow us
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-2 text-palette-graniteGray font-normal">
            <a className="inline-block" href="/">
              Facebook
            </a>
            <a className="inline-block" href="/">
              Dribbble
            </a>
            <a className="inline-block" href="/">
              Twitter
            </a>
            <a className="inline-block" href="/">
              Behance
            </a>
            <a className="inline-block" href="/">
              Instagram
            </a>
            <a className="inline-block" href="/">
              Pintereset
            </a>
            <a className="inline-block" href="/">
              Linkedin
            </a>
          </div>
        </div>
      </div>
      <div className="relative">
        <hr className="border-none h-[1px] bg-gray-300" />
        <button className="bg-[#f2f2f2] rounded-full border border-gray-300 p-3 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <IoIosArrowUp className="w-6 h-6 text-gray-300" />
        </button>
      </div>
      <div className="py-10">
        <p className="text-center text-palette-graniteGray">
          &copy; 2024. created by Moonfo
        </p>
      </div>
    </footer>
  );
};

export default Footer;
