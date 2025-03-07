import React from "react";

const Pagination = ({ currentPage, pages, SetCurrentPage }) => {
  return (
    <div className="w-full flex justify-center items-center h-24">
      <div className="flex justify-center items-center gap-4">
        {pages.map((item) => (
          <div
            key={item}
            className={`border cursor-pointer bg-white text-xl px-4 py-2 font-semibold ${
              currentPage === item ? "text-blue-500" : "text-slate-600"
            } `}
            onClick={() => {
              SetCurrentPage(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
