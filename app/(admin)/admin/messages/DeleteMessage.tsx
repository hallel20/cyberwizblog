"use client";

import DeleteModal from "@/components/DeleteModal";
import { deleteMessage } from "@/lib/actions";
import { useState } from "react";

const DeleteMessage = ({ name, id }: { name: string; id: number }) => {
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
        action={deleteMessage}
        open={open}
        setOpen={setOpen}
        name={name}
        id={id}
      />
    </>
  );
};

export default DeleteMessage;
