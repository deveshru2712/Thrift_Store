import React, { useEffect, useState } from "react";
import "ldrs/trefoil";

import ProductBox from "./ProductBox";
import Pagination from "./Pagination";

import productStore from "../store/productStore";
const Main = () => {
  const [currentPageNo, SetCurrentPageNo] = useState(1);

  const { productList, isFetching, getProducts } = productStore();

  useEffect(() => {
    getProducts();
  }, []);

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
            {productList.map((item) => (
              <ProductBox
                key={item._id}
                img={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default Main;
