import React, { lazy } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = import(() => import("../components/Card"));

const img1 = lazy(() => import("../assets/Best Seller!.png"));
const img2 = lazy(() => import("../assets/Fast Delivery Package Wings.png"));
const img3 = lazy(() => import("../assets/RETURN.png"));

const list = [
  {
    id: 1,
    title: "Premium Products",
    img: img1,
    description: "Curated selection of high-quality items from top brands",
  },
  {
    id: 2,
    title: "Fast Delivery",
    img: img2,
    description: "Quick and reliable shipping options for your convenience",
  },
  {
    id: 3,
    title: "Easy Returns",
    img: img3,
    description: "Hassle-free return policy with excellent customer support",
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className=" h-full w-full flex flex-col justify-center items-center gap-10">
        <div className="flex items-center justify-center gap-1">
          <ShoppingBag className="size-12 text-blue-500" />
          <span className="text-3xl font-bold">Shopify</span>
        </div>

        <div className=" flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center">
            <span className="text-6xl font-bold">Premium Shopping</span>
            <span className="text-6xl font-bold">Experience</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-slate-400">
              Discover a world of exceptional products with our premium shopping
            </span>
            <span className="text-xl font-semibold text-slate-400">
              platform.
            </span>
          </div>

          <div className="flex justify-center items-center gap-12">
            <button
              className="px-6 py-2 rounded-md text-base font-semibold bg-blue-500  text-white hover:bg-blue-500/90 active:scale-105 duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="border-2 px-6 py-2 rounded-md text-base font-semibold hover:bg-slate-100 active:scale-105  duration-200"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-12">
          {list.map((item) => (
            <div key={item.id} className="flex justify-center items-center">
              <Card
                title={item.title}
                img={item.img}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
