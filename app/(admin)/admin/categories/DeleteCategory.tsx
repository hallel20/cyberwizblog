"use client";

import DeleteModal from "@/components/DeleteModal";
import { deleteCategory } from "@/lib/actions";
import { useState } from "react";

const DeleteCategory = ({ name, id }: { name: string; id: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
      <DeleteModal
        action={deleteCategory}
        open={open}
        setOpen={setOpen}
        name={name}
        id={id}
      />
    </>
  );
};

export default DeleteCategory;
