import React, { useState } from 'react'

const RenderPanel = ({ 
  panelKey, 
  panelData, 
  selectPanelType, 
  handleImageUpload 
}) => {

  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-full h-full bg-gray-100 rounded-lg border flex items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      {hover && (
        <div className="absolute top-2 right-2 flex gap-2">
        
          <button
            className="bg-white p-2 rounded shadow hover:bg-gray-100"
            onClick={() => selectPanelType(panelKey, "image")}
          >
            📷
          </button>

          <button
            className="bg-white p-2 rounded shadow hover:bg-gray-100"
            onClick={() => selectPanelType(panelKey, "form")}
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
                onChange={(e) =>
                  handleImageUpload(panelKey, e.target.files[0])
                }
              />
            </label>
          ) : (
            <img
              src={panelData.image}
              alt="uploaded"
              className="max-h-full rounded"
            />
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
