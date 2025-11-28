import React from "react";

const SideBar = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Fields</h2>

      <div className="flex flex-col gap-3">
        <div className="p-3 bg-gray-100 rounded shadow-sm cursor-pointer">
          Name
        </div>

        <div className="p-3 bg-gray-100 rounded shadow-sm cursor-pointer">
          Email
        </div>

        <div className="p-3 bg-gray-100 rounded shadow-sm cursor-pointer">
          Mobile No
        </div>
      </div>
    </div>
  );
};

export default SideBar;
