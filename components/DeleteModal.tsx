"use client";
import { Dispatch, SetStateAction, useState } from "react";
import OverlayModal from "./reusable/OverlayModal";
import Spinner from "./reusable/Spinner";

interface Props {
  name: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  id: number;
  action: (id: number) => Promise<void>;
}

const DeleteModal = ({ name, setOpen, open, id, action }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      await action(id);
      setLoading(false);
      setOpen(false);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <OverlayModal open={open} setOpen={setOpen} small>
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete {name}</p>
        <div className="flex justify-between">
          <button
            onClick={() => setOpen(false)}
            className="bg-slate-300 text-black w-24 h-9 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white w-24 h-9 rounded-md flex gap-2 items-center justify-center"
          >
            Delete {loading && <Spinner />}
          </button>
        </div>
      </div>
    </OverlayModal>
  );
};

export default DeleteModal;
