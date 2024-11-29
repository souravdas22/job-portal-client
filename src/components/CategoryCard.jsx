import React from "react";

export default function Card({ category }) {
  return (
    <div className="p-4 shadow-xl w-72 h-80 flex justify-center flex-col items-center space-y-4 rounded-md relative group transition-transform duration-500 ease-in-out hover:scale-95">
      <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
        <img
          src={category.iconUrl}
          alt="logo"
          className="h-20 rounded-full border border-solid border-[#334e6f] border-opacity-40 shadow-sm transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="flex justify-center flex-col items-center space-y-6">
        <div className="text-center">
          <h3 className="font-semibold text-[#334e6f] text-lg">
            {category.name}
          </h3>
        </div>
        <div className="bg-[#1FB6501F] text-[#1FB650] text-sm px-3 py-2 rounded-lg font-bold font-sans">
          {category.count} Jobs
        </div>
      </div>
    </div>
  );
}
