import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-violet-900 text-white flex gap-5 justify-around p-3 ">
      <div className="logo">
        <span className="font-bold text-xl mx-8">iTask</span>
      </div>
      <ul className="flex justify-between  gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Todo</li>
      </ul>
    </nav>
  );
};

export default Navbar;
