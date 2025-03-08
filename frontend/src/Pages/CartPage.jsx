import { ChevronRight } from "lucide-react";
import React, { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authStore from "../store/authStore";
import productStore from "../store/productStore";

const Nav = lazy(() => import("../components/Nav"));

const CartPage = () => {
  const navigate = useNavigate();

  const { fetchCart, cart } = productStore();
  const { user } = authStore();

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <div className="w-full h-full">
      <Nav />

      {/* Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="hover:text-blue-600 cursor-pointer">Cart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="">
          {/* {user.cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-32 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              </div>
              <div> delete icon</div>
            </div>
          ))} */}
        </div>
        <div className="border w-1/2 flex flex-col justify-center items-center p-6 gap-4">
          <h1 className="text-2xl font-semibold text-slate-800 text-center">
            Summary
          </h1>
          <div className="w-full">
            <form action="" className="w-full flex justify-center gap-2">
              <div className="w-full flex flex-col justify-center items-start">
                <label htmlFor="promo_id" className="text-xl font-semibold">
                  Promo Code
                </label>
                <input
                  type="text"
                  className="w-full border-2 px-4 py-1 rounded-lg"
                  placeholder="Enter here"
                  id="promo_id"
                />
              </div>

              <div className="flex justify-center items-end">
                <button className="text-xl bg-blue-500 text-white px-3 py-1 rounded-lg">
                  APPLY
                </button>
              </div>
            </form>
          </div>
          <div className="border-b w-full"></div>
          <div className="w-full flex justify-between">
            <span className="text-base font-bold">SubTotal</span>
            <span className="text-base font-semibold">$300</span>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-base font-bold">Tax</span>
            <span className="text-base font-semibold">$00</span>
          </div>

          <div className="w-full flex justify-between">
            <span className="text-xl font-bold">Total</span>
            <span className="text-lg font-semibold">$300</span>
          </div>
          <button className="w-full py-3 bg-blue-500 text-white font-bold text-2xl cursor-pointer rounded-lg active:scale-110 duration-200 hover:bg-blue-500/90">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
