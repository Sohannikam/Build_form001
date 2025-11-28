import React from "react"; 
import { useRecoilState } from "recoil";
import { activePanelState } from "../atoms/activePanelState";
import { panelsState } from "../atoms/panelsState";

const SideBar = () => {

  const [activePanel] = useRecoilState(activePanelState);
  const [panels, setPanels] = useRecoilState(panelsState);

  // Sidebar Items
  const fieldItems = [
    { title: "Name", type: "name" },
    { title: "Email", type: "email" },
    { title: "Mobile No", type: "mobile" },
    { title: "Image", type: "image" },
  ];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ fieldType: item.type })
    );
  };

  return (
    <div className="p-3">

      <h2 className="text-lg font-semibold mb-3">Fields</h2>

      <div className="flex flex-col gap-3 mb-5">
        {fieldItems.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className={`p-3 bg-gray-100 rounded shadow-sm cursor-pointer
              ${item.type === "image" ? "bg-blue-100" : ""}
            `}
          >
            {item.title}
          </div>
        ))}
      </div>


      {/* ====================================================== */}
      {/*                IMAGE SETTINGS PANEL (NEW)              */}
      {/* ====================================================== */}
      {activePanel && panels[activePanel].type === "image" && (
        <div className="mt-5 p-4 border rounded-lg shadow-sm bg-white">

          <h3 className="font-semibold text-lg mb-3">Image settings</h3>

          {/* Replace (upload new image) */}
          <button
            className="text-blue-600 underline mb-3 cursor-pointer"
            onClick={() => document.getElementById("replace-img-input").click()}
          >
            Replace
          </button>

          <input
            id="replace-img-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const url = URL.createObjectURL(file);

              setPanels((prev) => ({
                ...prev,
                [activePanel]: {
                  ...prev[activePanel],
                  image: url
                }
              }));
            }}
          />

          {/* Preview */}
          {panels[activePanel].image && (
            <img
              src={panels[activePanel].image}
              className="w-full rounded-lg border mb-3"
            />
          )}

          {/* Insert via URL */}
          <label className="block text-sm font-medium mb-1">
            Insert image from URL
          </label>

          <input
            type="text"
            placeholder="https://example.com/image.png"
            className="w-full p-2 border rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPanels((prev) => ({
                  ...prev,
                  [activePanel]: {
                    ...prev[activePanel],
                    image: e.target.value
                  }
                }));
              }
            }}
          />
        </div>
      )}

    </div>
  );
};

export default SideBar;
