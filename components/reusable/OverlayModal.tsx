"use client";
import { IoMdClose } from "react-icons/io";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
  small?: boolean;
}

const OverlayModal = ({ children, open, setOpen, small }: Props) => {
  const modalRef = useRef<any>();

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className="fixed top-0 left-0 right-0 max-h-screen overflow-y-scroll bottom-0 z-20 w-full justify-center items-center ease-in-out 1s"
      style={{
        backgroundColor: "#00000095",
        display: open ? "flex" : "none",
      }}
      ref={modalRef}
    >
      <div
        className={`${
          small ? "min-h-24 w-7/12 md:w-5/12" : "w-10/12 md:w-8/12 min-h-96"
        } bg-white p-5 rounded-lg relative flex flex-col justify-between pt-16`}
      >
        {setOpen && (
          <button
            className="absolute top-4 right-4 p-2 text-black bg-slate-100 rounded-md text-3xl font-bold"
            onClick={() => setOpen(false)}
          >
            <IoMdClose />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default OverlayModal;
