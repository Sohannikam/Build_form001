import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { panelsState } from "../../atoms/panelsState";
import { activePanelState } from "../../atoms/activePanelState";
import imageicon from "../../assets/image-icon.jpg"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";



const RenderPanel = ({ panelKey }) => {

  const containerRef = useRef(null);
const [panelHeight, setPanelHeight] = useState(0);


  const [activePanel, setActivePanel] = useRecoilState(activePanelState);

  
  const [panels, setPanels] = useRecoilState(panelsState);

   const fileInputRef = useRef(null);

   const objectFitStyle =
  panelHeight < 200 ? "object-fill" : "object-contain";


   useEffect(() => {
  if (containerRef.current) {
    setPanelHeight(containerRef.current.offsetHeight);
  }
}, [panels, panelKey]);


     const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
   const panel = panels[panelKey];
   // -----------------------------
  // Handle Image Upload
  // -----------------------------
  const handleImageUpload = (file) => {
    const url = URL.createObjectURL(file);

    setPanels((prev) => ({
      ...prev,
      [panelKey]: {
        ...prev[panelKey],
        type: "image",
        image: url,
        fields: [] // reset fields for safety
      }
    }));
  };

  const deleteField = (id) => {
    setPanels((prev) => ({
      ...prev,
      [panelKey]: {
        ...prev[panelKey],
        fields: prev[panelKey].fields.filter((f) => f.id !== id)
      }
    }));
  };


  // ----------------------------
  // SORT HANDLER
  // ----------------------------
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPanels((prev) => {
      const items = prev[panelKey].fields;
      const oldIndex = items.findIndex((f) => f.id === active.id);
      const newIndex = items.findIndex((f) => f.id === over.id);

      return {
        ...prev,
        [panelKey]: {
          ...prev[panelKey],
          fields: arrayMove(items, oldIndex, newIndex)
        }
      };
    });
  };


const handleDrop = (e) => {
  e.preventDefault();
  let data = e.dataTransfer.getData("application/json");
  if (!data) return;

  const { fieldType } = JSON.parse(data);  // <-- FIXED

  const otherKey = panelKey === "panel1" ? "panel2" : "panel1";

  // --------------------------
  // WHEN DROPPING IMAGE
  // --------------------------
if (fieldType === "image") {
      setPanels((prev) => ({
        ...prev,
        [panelKey]: { type: "image", image: null, fields: [] },

        [otherKey]: {
          ...prev[otherKey],
          type: "form",
          fields: prev[otherKey].fields || []
        }
      }));
      return;
    }

  // --------------------------
  // WHEN DROPPING FORM FIELD
  // --------------------------
  setPanels((prev) => ({
      ...prev,

      [panelKey]: {
        ...prev[panelKey],
        type: "form",
       fields: [
  ...prev[panelKey].fields,
  { id: Date.now(), type: fieldType, value: "" }
]
      },

      [otherKey]:
        prev[otherKey].type === "empty"
          ? { type: "image", image: null, fields: [] }
          : prev[otherKey]
    }));
};


  return (
    <div
        onClick={() => setActivePanel(panelKey)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-full h-full border rounded-lg p-3 bg-gray-100 cursor-pointer"
    >
      {panels[panelKey].type === "empty" && (
        <div className="text-gray-400 flex justify-center items-center h-full">
          Drop Here
        </div>
      )}

        {/* IMAGE PANEL */}
{panels[panelKey].type === "image" && (
  <div
    ref={containerRef}
    className="w-full h-full flex items-center justify-center bg-white rounded overflow-hidden"
  >
    {panels[panelKey].image ? (
      <img
        src={panels[panelKey].image}
        className={`w-full h-full ${objectFitStyle}`}
      />
    ) : (
      <img
        src={imageicon}
        alt="logo"
        className={`w-full h-full object-contain cursor-pointer`}
      />
    )}
  </div>
)}

  {panel.type === "form" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={panel.fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {panel.fields.map((field) => (
                <SortableField
                  key={field.id}
                  field={field}
                  deleteField={deleteField}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

    </div>
  );
};

// --------------------------------------------------------
// SORTABLE FIELD COMPONENT (REUSABLE)
// --------------------------------------------------------
const SortableField = ({ field, deleteField }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}   // <-- NOW ENTIRE FIELD IS DRAGGABLE
      className="bg-white p-3 rounded shadow relative cursor-grab active:cursor-grabbing"
    >
      {/* DELETE BUTTON */}
      <button
        onClick={() => deleteField(field.id)}
        className="absolute right-1 top-1 text-red-500"
      >
        ❌
      </button>

      <label className="block text-sm font-medium capitalize mb-1">
        {field.type}
      </label>

      {field.type === "name" && (
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Enter name"
        />
      )}

      {field.type === "email" && (
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Enter email"
        />
      )}

      {field.type === "mobile" && (
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Enter mobile"
        />
      )}
    </div>
  );
};

export default RenderPanel;

