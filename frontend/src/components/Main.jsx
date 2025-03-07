import React, { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "ldrs/trefoil";

const ProductBox = lazy(() => import("./ProductBox"));
const Pagination = lazy(() => import("./Pagination"));

import productStore from "../store/productStore";

const Main = () => {
  const { productList, isFetching, getProducts } = productStore();

  const [currentPage, SetCurrentPage] = useState(1);
  const productPerPage = 9;

  const pages = [];

  let lastIndex = currentPage * productPerPage;
  let firstIndex = lastIndex - productPerPage;

  // how many page will be there
  for (let i = 1; i <= Math.ceil(productList.length / productPerPage); i++) {
    pages.push(i);
  }

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <div className="w-full h-full">
      {isFetching ? (
        //loading animation when the product list was fetched
        <div className="w-full h-full flex justify-center items-center">
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
        <div className="w-full h-full">
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 gap-4">
            {productList.slice(firstIndex, lastIndex).map((item) => (
              <ProductBox
                key={item._id}
                product={item}
                onClick={() => navigate(`/product/${item._id}`)}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pages={pages}
            SetCurrentPage={SetCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
