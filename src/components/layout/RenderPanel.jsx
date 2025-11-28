import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { panelsState } from "../../atoms/panelsState";

const RenderPanel = ({ panelKey }) => {
  const [panels, setPanels] = useRecoilState(panelsState);
  const panelData = panels[panelKey];

  const [hover, setHover] = useState(false);

  const selectPanelType = (type) => {
    const other = panelKey === "panel1" ? "panel2" : "panel1";

    setPanels((prev) => ({
      ...prev,
      [panelKey]: { ...prev[panelKey], type },
      [other]: { ...prev[other], type: type === "image" ? "form" : "image" }
    }));
  };

  const handleImageUpload = (file) => {
    const url = URL.createObjectURL(file);

    setPanels((prev) => ({
      ...prev,
      [panelKey]: { ...prev[panelKey], image: url, type: "image" }
    }));
  };

  return (
    <div
      className="relative w-full h-full bg-gray-100 rounded-lg border flex items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && panelData.type === "empty" && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="bg-white p-2 rounded shadow hover:bg-gray-100"
            onClick={() => selectPanelType("image")}
          >
            📷
          </button>

          <button
            className="bg-white p-2 rounded shadow hover:bg-gray-100"
            onClick={() => selectPanelType("form")}
          >
            🧾
          </button>
        </div>
      )}

      {panelData.type === "empty" && (
        <p className="text-gray-500">Empty Panel</p>
      )}

      {panelData.type === "image" && (
        <div className="flex flex-col items-center">
          {!panelData.image ? (
            <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded">
              Upload Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          ) : (
            <img src={panelData.image} alt="uploaded" className="max-h-full rounded" />
          )}
        </div>
      )}

      {panelData.type === "form" && (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          Drop Fields Here
        </div>
      )}
    </div>
  );
};

export default RenderPanel;
