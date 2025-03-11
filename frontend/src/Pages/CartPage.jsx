import { ChevronRight, Meh } from "lucide-react";
import React, { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "ldrs/trefoil";

import authStore from "../store/authStore";
import cartStore from "../store/cartStore";

const Nav = lazy(() => import("../components/Nav"));

const CartPage = () => {
  const calculate = () => {
    let total = 0;
    if (!cart || cart.length === 0) return total;
    else {
      cart.forEach((item) => (total += item.product.price * item.quantity));
      return total;
    }
  };

  const navigate = useNavigate();

  const { fetchCart, isFetching, cart, updateQuantity } = cartStore();
  const { user } = authStore();

  useEffect(() => {
    fetchCart();
  }, [user]);

  const onClickHandler = async (method, id) => {
    await updateQuantity(method, id);
    fetchCart();
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Nav />

      {/* Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col ">
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
        <div className="">
          <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2">
        {/* first section */}

        <div className="">
          {isFetching ? (
            <div className="w-full h-full flex justify-center items-center">
              <l-trefoil
                size="40"
                stroke="4"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.4"
                color="#3B82F6"
              ></l-trefoil>
            </div>
          ) : cart && cart.length > 0 ? (
            <div className="w-full h-full p-4">
              <div className="flex flex-col w-full justify-center items-center shadow-lg rounded-md gap-4 px-8">
                {cart.map((item, index) => (
                  <div
                    key={item.product._id}
                    className={`w-full flex justify-between items-center p-4 ${
                      index !== cart.length - 1 ? "border-b-2" : ""
                    }`}
                  >
                    <div className="flex justify-center items-center">
                      <div>
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="size-24 object-contain"
                        />
                      </div>
                      <div className="w-72 flex flex-col justify-center items-start gap-2">
                        <span className="w-52 text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-500 hover:scale-105 duration-200 cursor-pointer">
                          {item.product.title}
                        </span>
                        <span className="w-64 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis ">
                          {item.product.description}
                        </span>

                        <div className="border rounded-md bg-slate-100">
                          <button
                            className="w-6 text-xl font-semibold p-1 hover:bg-blue-500 hover:text-white rounded-md"
                            onClick={() =>
                              onClickHandler("desc", item.product._id)
                            }
                          >
                            -
                          </button>
                          <span className="w-12 text-xl font-semibold p-1 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            className="w-6 text-xl font-semibold p-1 hover:bg-blue-500 hover:text-white rounded-md"
                            onClick={() =>
                              onClickHandler("inc", item.product._id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <span className="text-xl font-semibold text-slate-800">
                        ${item.product.price}
                      </span>
                      <span className="text-xl font-semibold text-blue-500">
                        Remove
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {/* second section */}
        <div className="flex justify-center items-start">
          <div className="border w-1/2 h-1/2 flex flex-col justify-center items-center p-6 gap-4 ">
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
              <span className="text-base font-semibold">
                {isFetching ? (
                  <span>loading...</span>
                ) : (
                  <span>${calculate()}</span>
                )}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <span className="text-base font-bold">Tax</span>
              <span className="text-base font-semibold">$00</span>
            </div>

            <div className="w-full flex justify-between">
              <span className="text-xl font-bold">Total</span>
              <span className="text-lg font-semibold">
                {isFetching ? (
                  <span>loading...</span>
                ) : (
                  <span>${calculate()}</span>
                )}
              </span>
            </div>
            <button className="w-full py-3 bg-blue-500 text-white font-bold text-2xl cursor-pointer rounded-lg active:scale-110 duration-200 hover:bg-blue-500/90">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
