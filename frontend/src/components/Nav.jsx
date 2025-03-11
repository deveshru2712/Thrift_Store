import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Search, ShoppingBag, ShoppingCart } from "lucide-react";
import cartStore from "../store/cartStore";
import productStore from "../store/productStore";

const Nav = () => {
  const [input, setInput] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const { cart, isFetching, fetchCart } = cartStore();
  const { list, isLoading, searchProduct, error } = productStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    searchProduct(input);
    setSearchResultsVisible(false);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim() !== "") {
      searchProduct(e.target.value);
      setSearchResultsVisible(true);
    } else {
      setSearchResultsVisible(false);
    }
  };

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center py-4 px-8 shadow-md">
        {/* first section */}
        <div
          className="flex items-center justify-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ShoppingBag className="size-8 text-blue-500" />
          <span className="text-xl font-bold">Shopify</span>
        </div>
        {/* second section */}
        <div className="w-1/3 relative">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex items-center justify-between border-2 rounded-lg py-1 px-2 relative"
          >
            <input
              type="text"
              className="w-full text-slate-700 outline-none"
              value={input}
              onChange={handleInputChange}
              aria-label="Search products"
              placeholder="Search products"
            />
            {searchResultsVisible && list && list.length > 0 && (
              <div className="absolute flex flex-col justify-center items-center z-10 border px-4 rounded-md cursor-pointer top-0 left-0 translate-y-8 w-full bg-white">
                {list.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="w-full flex justify-start items-center gap-2 p-2"
                  >
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="size-8 object-contain"
                      />
                    </div>
                    <div className="text-lg font-semibold hover:text-blue-500 truncate-title">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="hover:text-blue-500/90 active:scale-110 active:text-blue-500 duration-200"
              type="submit"
            >
              <Search className="size-6" />
            </button>
          </form>
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 opacity-50">
              Loading...
            </div>
          )}
          {error && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-red-100 opacity-50">
              Error fetching data
            </div>
          )}
        </div>
        {/* third section */}
        <div className="flex justify-center items-center">
          <button
            className="relative active:scale-110 duration-200"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="size-6 text-slate-600" />
            {!isFetching && cart && (
              <div className="flex justify-center items-center size-5 absolute bg-blue-500 text-white text-base top-0 -right-1 -translate-y-3 translate-x-1/2 rounded-full">
                {cart.length}
              </div>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
