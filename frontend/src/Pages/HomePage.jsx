import React, { lazy } from "react";

const Nav = lazy(() => import("../components/Nav"));
const SideBar = lazy(() => import("../components/SideBar"));
const Main = lazy(() => import("../components/Main"));

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <Nav />
      <div className="w-full h-full flex">
        <SideBar />
        <Main />
      </div>
    </div>
  );
};

export default HomePage;
