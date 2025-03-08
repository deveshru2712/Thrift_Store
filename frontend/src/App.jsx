import React, { lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "ldrs/trefoil";

import authStore from "./store/authStore";

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const Welcome = lazy(() => import("./Pages/Welcome"));
const Home = lazy(() => import("./Pages/HomePage"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));

const App = () => {
  const { user, authCheck, isAuthChecking } = authStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <>
      {isAuthChecking ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <l-trefoil
            size="40"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.4"
            color="black"
          ></l-trefoil>
        </div>
      ) : (
        <div className="w-screen h-screen">
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to={"/"} /> : <LoginPage />}
            />
            <Route
              path="/welcome"
              element={user ? <Navigate to={"/"} /> : <Welcome />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={"/welcome"} />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to={"/"} /> : <SignupPage />}
            />
            <Route
              path="/product/:id"
              element={user ? <ProductPage /> : <Navigate to={"/welcome"} />}
            />

            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to={"/welcome"} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
