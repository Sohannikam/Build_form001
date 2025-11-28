import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { layoutState } from "../atoms/layoutState";
import RenderPanel from "../components/layout/RenderPanel";

const FormArea = () => {
  const [showModal, setShowModal] = useState(false);

  const [layoutData, setLayoutData] = useRecoilState(layoutState);

  const { layout, leftWidth, topHeight } = layoutData;

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  // Close modal
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
      setLayoutData((prev) => ({ ...prev, leftWidth: newWidth }));
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
      setLayoutData((prev) => ({ ...prev, topHeight: newHeight }));
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

      {/* Main Builder Container */}
      <div
        ref={containerRef}
        className="w-[90%] h-[70%] bg-white rounded-lg p-3 text-gray-500 relative"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {!layout && (
          <div className="h-full flex items-center justify-center">
            Drop Fields Here
          </div>
        )}

        {/* HORIZONTAL LAYOUT */}
        {layout === "horizontal" && (
          <div className="flex h-full">
            <div style={{ width: `${leftWidth}%` }}>
              <RenderPanel panelKey="panel1" />
            </div>

            {/* Divider */}
            <div
              onMouseDown={() => {
                window.onmousemove = handleHorizontalDrag;
                window.onmouseup = () => (window.onmousemove = null);
              }}
              className="w-[6px] bg-gray-400 cursor-col-resize mx-1"
            />

            <div style={{ width: `${100 - leftWidth}%` }}>
              <RenderPanel panelKey="panel2" />
            </div>
          </div>
        )}

        {/* VERTICAL LAYOUT */}
        {layout === "vertical" && (
          <div className="flex flex-col h-full">
            <div style={{ height: `${topHeight}%` }}>
              <RenderPanel panelKey="panel1" />
            </div>

            <div
              onMouseDown={() => {
                window.onmousemove = handleVerticalDrag;
                window.onmouseup = () => (window.onmousemove = null);
              }}
              className="h-[6px] bg-gray-400 cursor-row-resize my-1"
            />

            <div style={{ height: `${100 - topHeight}%` }}>
              <RenderPanel panelKey="panel2" />
            </div>
          </div>
        )}
      </div>

      {/* Layout Modal */}
      {showModal && (
        <div
          className="absolute inset-0 bg-opacity-40 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white w-80 p-6 rounded-lg shadow-lg relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Select Layout</h2>

            {/* Horizontal */}
            <button
              onClick={() => {
                setLayoutData((prev) => ({ ...prev, layout: "horizontal", leftWidth: 60 }));
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

            {/* Vertical */}
            <button
              onClick={() => {
                setLayoutData((prev) => ({ ...prev, layout: "vertical", topHeight: 30 }));
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

            {/* Normal */}
            <button
              onClick={() => {
                setLayoutData((prev) => ({ ...prev, layout: null }));
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
