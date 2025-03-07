import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

const ProductBox = ({ title, img, price }) => {
  return (
    <div className="border-2 h-[230px] rounded-lg p-2 flex flex-col justify-center items-center group">
      <div className=" flex justify-center items-center">
        <img
          src={img}
          alt={title}
          className="size-36 object-contain group-hover:scale-110 duration-200 cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-lg w-48 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </div>
        <div className="w-full flex justify-between items-center">
          <button>
            <ShoppingCart size={20} className="hover:text-blue-500 font-bold" />
          </button>
          <div className="text-xl font-semibold hover:text-blue-500 ">
            ${price}
          </div>
          <button>
            <Heart size={20} className="hover:text-red-400 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
