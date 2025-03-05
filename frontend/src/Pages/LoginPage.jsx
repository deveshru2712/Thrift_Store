import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full h-full">
      <nav className="flex justify-start p-4 shadow-md">
        <div className="flex items-center justify-center gap-1">
          <ShoppingBag className="size-8 text-blue-500" />
          <span className="text-xl font-bold">Shopify</span>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex justify-center items-center mt-8">
          <span className="text-blue-500 text-base font-bold border border-blue-400 rounded-lg bg-blue-300/30 px-2 py-1">
            Premium Shopping Experience
          </span>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold ">Welcome Back</h1>
            <span className="text-lg font-semibold text-slate-500">
              Enter your credentials to access your account.
            </span>
          </div>
        </div>

        <div className="border-2 shadow-md flex flex-col justify-center items-center rounded-lg gap-4 p-4">
          <div className="w-full">
            <h1 className="text-2xl font-semibold w-full text-left">Log in</h1>
            <span className="w-full text-lg font-semibold text-slate-500">
              Login to access your account
            </span>
          </div>

          <form
            action=""
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-[350px] border px-4 py-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[350px] border px-4 py-2 rounded-lg"
            />
            <div className="flex items-center justify-end w-full">
              <span className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-500/90 active:scale-105 duration-200">
              Sign in
            </button>
          </form>
          <span className="flex justify-between items-center gap-1">
            Don't have an account?
            <Link
              to={"/signup"}
              className="text-blue-400 text-lg font-semibold"
            >
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
