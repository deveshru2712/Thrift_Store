import React from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Main from "../components/Main";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Nav />
      <div className="w-full h-full flex">
        <SideBar />
        <Main />
      </div>
    </div>
  );
};

export default HomePage;
