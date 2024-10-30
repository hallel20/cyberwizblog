"use client";
import OverlayModal from "@/components/reusable/OverlayModal";
import dynamic from "next/dynamic";
import { useState } from "react";
// import NewCategory from "./NewCategory";

const NewCategory = dynamic(() => import("./NewCategory"));

const CategoryModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        Add New Category
      </button>
      <OverlayModal open={open} setOpen={setOpen}>
        <NewCategory setOpen={setOpen} />
      </OverlayModal>
    </>
  );
};

export default CategoryModal;
