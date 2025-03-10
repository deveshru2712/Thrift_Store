import React, { useEffect, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star, ChevronRight } from "lucide-react";
import "ldrs/trefoil";

import productStore from "../store/productStore";
import cartStore from "../store/cartStore";
const Nav = lazy(() => import("../components/Nav"));

const ProductPage = () => {
  const { id } = useParams();
  const { product, getProductById, isLoading } = productStore();
  const { addCart, isCartUpdating, isFetching } = cartStore();

  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id);
  }, [id]);

  if (isLoading || !product) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50">
        <l-trefoil
          size="40"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
        ></l-trefoil>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden font-sans">
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
          <span className="hover:text-blue-600 cursor-pointer">
            {product.category}
          </span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center items-center p-8 bg-gray-100">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-80 h-80 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center p-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(product.rating.rate)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-b py-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    addCart(product._id);
                  }}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  {isCartUpdating ? (
                    <l-trefoil
                      size="28"
                      stroke="4"
                      stroke-length="0.15"
                      bg-opacity="0.1"
                      speed="1.4"
                      color="white"
                    ></l-trefoil>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </div>
                  )}
                </button>
                <button className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <p>Free shipping on orders over $50</p>
                <p>30-day easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
