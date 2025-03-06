import React from "react";
import { Search, ShoppingBag, ShoppingCart } from "lucide-react";

const Nav = () => {
  return (
    <div className="w-full">
      <nav className="flex justify-between items-center py-4 px-8 shadow-md">
        {/* first section */}
        <div className="flex items-center justify-center gap-1">
          <ShoppingBag className="size-8 text-blue-500" />
          <span className="text-xl font-bold">Shopify</span>
        </div>
        {/* second section */}
        <div className="w-1/3">
          <form className="flex items-center justify-between border-2 rounded-lg py-1 px-2">
            <input type="text" className="w-full text-slate-700 outline-none" />
            <button
              className="hover:text-blue-500/90 active:scale-110 active:text-blue-500 duration-200"
              type="submit"
            >
              <Search className="size-6" />
            </button>
          </form>
        </div>
        {/* third section */}
        <div className="flex justify-center items-center">
          <button className="relative active:scale-110 duration-200">
            <ShoppingCart className="size-6 text-slate-600" />
            <div className="flex justify-center items-center size-5 absolute bg-blue-500 text-white text-base top-0 -right-1 -translate-y-3 translate-x-1/2 rounded-full">
              4
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
