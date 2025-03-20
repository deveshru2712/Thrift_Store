import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <Nav />
      <h1 className="text-center mt-4 text-3xl font-semibold">
        Page not found
        <Link to={"/"} className="text-blue-600 hover:underline">
          , return Home
        </Link>
      </h1>
    </div>
  );
};

export default PageNotFound;
