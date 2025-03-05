import React from "react";

const Card = ({ img, title, description }) => {
  return (
    <div className="w-4/6 border-2 rounded-lg shadow-md flex flex-col justify-center items-center p-6 gap-3 hover:cursor-pointer group">
      <div className="w-full flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="size-20 object-contain group-hover:scale-110 duration-200"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-xl font-semibold group-hover:text-blue-400 duration-200">
          {title}
        </span>
        <span className="text-base font-semibold text-slate-400 break-normal">
          {description}
        </span>
      </div>
    </div>
  );
};

export default Card;
