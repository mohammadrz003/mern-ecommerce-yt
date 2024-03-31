import React from "react";

const FilterProducts = (props) => {
  return (
    <>
      {props.viewModes.map((item) => (
        <button
          onClick={() => props.onChangeViewMode(item.mode)}
          className={`${
            props.activeViewMode === item.mode
              ? "bg-palette-chineseBlack text-white"
              : "text-[#c2c3c4]"
          } p-6 flex justify-center items-center`}
          key={item.mode}
        >
          <item.icon className="w-7 h-auto" />
        </button>
      ))}
      <button className="py-6 px-10 text-palette-graniteGray font-semibold">
        FILTER
      </button>
    </>
  );
};

export default FilterProducts;
