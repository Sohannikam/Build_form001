import React from "react";
import SideBar from "../../pages/Sidebar";
import FormArea from "../../pages/FormArea";
import Preview from "../../pages/Preview";
import Nav from "../../pages/Nav";

const Layout = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="flex items-center justify-between px-2 border-b border-gray-300 bg-white">
        <Nav />
      </div>

      <div className="flex w-full h-screen bg-gray-100">
        {/* LEFT PANEL - SIDEBAR */}
        <div className="w-[20%] min-w-[200px] bg-white p-4 border-r border-gray-300">
          <SideBar />
        </div>

        {/* MIDDLE PANEL - FORM AREA */}
        <div className="flex-1 bg-white p-4 border-r border-gray-300">
          <FormArea />
        </div>

        {/* RIGHT PANEL - PREVIEW */}
        <div className="w-[25%] min-w-[250px] bg-white p-4">
          <Preview />
        </div>
      </div>
    </>
  );
};

export default Layout;
