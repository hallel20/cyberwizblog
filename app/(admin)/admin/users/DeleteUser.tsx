"use client";
import DeleteModal from "@/components/DeleteModal";
import { deletePost, deleteUser } from "@/lib/actions";
import { useState } from "react";

interface Props {
  id: number;
  name: string;
}

const DeleteUser = ({ id, name }: Props) => {
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
        open={open}
        setOpen={setOpen}
        action={deleteUser}
        id={id}
        name={name}
      />
    </>
  );
};

export default DeleteUser;
