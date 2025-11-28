import React, { useState, useRef } from "react";
import RenderPanel from "../components/layout/RenderPanel";

const FormArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [layout, setLayout] = useState(null);

  // new code starts here 
  const [panels, setPanels] = useState({
  panel1: { type: "empty", image: null, fields: [] },
  panel2: { type: "empty", image: null, fields: [] }
});

  const selectPanelType = (panelKey, type) => {
    const otherKey = panelKey === "panel1" ? "panel2" : "panel1";
  
    setPanels({
      [panelKey]: { ...panels[panelKey], type },
      [otherKey]: { ...panels[otherKey], type: type === "image" ? "form" : "image" }
    });
  };
  
  const handleImageUpload = (panelKey, file) => {
    const url = URL.createObjectURL(file);
    setPanels({
      ...panels,
      [panelKey]: { ...panels[panelKey], image: url, type: "image" }
    });
  };

// ends here 

  // Horizontal layout state
  const [leftWidth, setLeftWidth] = useState(60);

  // Vertical layout state
  const [topHeight, setTopHeight] = useState(30);

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  // Horizontal drag
  const handleHorizontalDrag = (e) => {
    const container = containerRef.current;
    if (!container) return;

    let newWidth =
      ((e.clientX - container.getBoundingClientRect().left) /
        container.offsetWidth) *
      100;

    if (newWidth > 10 && newWidth < 90) {
      setLeftWidth(newWidth);
    }
  };

  // Vertical drag
  const handleVerticalDrag = (e) => {
    const container = containerRef.current;
    if (!container) return;

    let newHeight =
      ((e.clientY - container.getBoundingClientRect().top) /
        container.offsetHeight) *
      100;

    if (newHeight > 10 && newHeight < 90) {
      setTopHeight(newHeight);
    }
  };

  return (
    <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg relative">

      {/* Layout Button */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer"
      >
        Select Layout
      </button>

      {/* Inner container */}
      <div
        ref={containerRef}
        className="w-[90%] h-[70%] bg-white rounded-lg p-3 text-gray-500 relative"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {/* DEFAULT VIEW */}
        {!layout && (
          <div className="h-full flex items-center justify-center">
            Drop Fields Here
          </div>
        )}

        {/* HORIZONTAL SPLIT */}
        {layout === "horizontal" && (
       <div className="flex h-full">
  <div style={{ width: `${leftWidth}%` }}>
 <RenderPanel
  panelKey="panel1"
  panelData={panels.panel1}
  selectPanelType={selectPanelType}
  handleImageUpload={handleImageUpload}
/>
  </div>

  {/* Divider */}
  <div
    onMouseDown={() => {
      window.onmousemove = handleHorizontalDrag;
      window.onmouseup = () => (window.onmousemove = null);
    }}
    className="w-[6px] bg-gray-400 cursor-col-resize mx-1"
  ></div>

  <div style={{ width: `${100 - leftWidth}%` }}>
  <RenderPanel
  panelKey="panel2"
  panelData={panels.panel2}
  selectPanelType={selectPanelType}
  handleImageUpload={handleImageUpload}
/>

  </div>
</div>

        )}

        {/* VERTICAL SPLIT */}
        {layout === "vertical" && (
          <div className="flex flex-col h-full">

  <div style={{ height: `${topHeight}%` }}>
    <RenderPanel
  panelKey="panel1"
  panelData={panels.panel1}
  selectPanelType={selectPanelType}
  handleImageUpload={handleImageUpload}
/>

  </div>

  <div
    onMouseDown={() => {
      window.onmousemove = handleVerticalDrag;
      window.onmouseup = () => (window.onmousemove = null);
    }}
    className="h-[6px] bg-gray-400 cursor-row-resize my-1"
  ></div>

  <div style={{ height: `${100 - topHeight}%` }}>
    <RenderPanel
  panelKey="panel2"
  panelData={panels.panel2}
  selectPanelType={selectPanelType}
  handleImageUpload={handleImageUpload}
/>
  </div>
</div>

        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="absolute inset-0  bg-opacity-40 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white w-80 p-6 rounded-lg shadow-lg relative"
          >
            {/* Cross icon */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Select Layout</h2>

            {/* Option 1 - Horizontal */}
            <button
              onClick={() => {
                setLayout("horizontal");
                setLeftWidth(60);
                setShowModal(false);
              }}
              className="w-full mb-3 border rounded-lg p-3 hover:bg-gray-100"
            >
              <div className="flex gap-1">
                <div className="w-[60%] h-12 bg-gray-300 rounded"></div>
                <div className="w-[40%] h-12 bg-gray-300 rounded"></div>
              </div>
              <p className="text-center mt-2 text-sm font-medium">
                2 Columns (Resizable)
              </p>
            </button>

            {/* Option 2 - Vertical */}
            <button
              onClick={() => {
                setLayout("vertical");
                setTopHeight(30);
                setShowModal(false);
              }}
              className="w-full mb-3 border rounded-lg p-3 hover:bg-gray-100"
            >
              <div className="flex flex-col gap-1">
                <div className="h-[30px] bg-gray-300 rounded"></div>
                <div className="h-[70px] bg-gray-300 rounded"></div>
              </div>
              <p className="text-center mt-2 text-sm font-medium">
                2 Rows (Resizable)
              </p>
            </button>

            {/* Option 3 - Normal Layout */}
            <button
              onClick={() => {
                setLayout(null);
                setShowModal(false);
              }}
              className="w-full border rounded-lg p-3 hover:bg-gray-100"
            >
              <div className="flex items-center justify-center h-12">
                Drop Fields Here
              </div>
              <p className="text-center mt-2 text-sm font-medium">
                Normal Layout
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormArea;
