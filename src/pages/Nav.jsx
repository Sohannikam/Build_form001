import React from "react";
import { useNavigate } from "react-router-dom";
import webtrixLogo from "../assets/webtrix-logo.png"

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between bg-white px-4 py-2 shadow border-b border-gray-300">
      {/* Logo */}
      <img
        src={webtrixLogo}
        alt="logo"
        className="h-10 w-auto cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Preview Button */}
      <button
        onClick={() => navigate("/preview")}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        {/* Preview Icon (Heroicons) */}
    
      </button>
    </div>
  );
};

export default Nav;
