import React from "react";

const list = [
  {
    id: 1,
    name: "Men Cloths",
  },
  {
    id: 2,
    name: "Women Cloths",
  },
  {
    id: 3,
    name: "Tech",
  },
  {
    id: 4,
    name: "Watch",
  },
  {
    id: 5,
    name: "Electronics",
  },
  {
    id: 6,
    name: "Shoes",
  },
];

const SideBar = () => {
  return (
    <div className="w-1/6 min-h-full flex flex-col items-start px-8 py-4 border-2 gap-4">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <form className="flex flex-col gap-2">
        {list.map((item) => (
          <div className="flex gap-2" key={item.id}>
            <input type="checkbox" id={item.name} />
            <label htmlFor={item.name} className="text-lg font-semibold">
              {item.name}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default SideBar;
