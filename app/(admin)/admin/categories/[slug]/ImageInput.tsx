"use client";
import ImageUploadModal from "@/components/reusable/ImageUploadModal";
import OverlayModal from "@/components/reusable/OverlayModal";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const ImageInput = ({ defaultImage }: { defaultImage: string }) => {
  const [images, setImages] = useState<string[] | undefined>([defaultImage]);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const image = images![0];
    console.log("Deleting....");
    try {
      setImages([]);
      await axios.post("/api/uploads/delete", { image });
    } catch (ex) {
      setImages(images);
      console.log(ex);
    }
  };

  return (
    <>
      <ImageUploadModal setImages={setImages} single />
      {images?.length == 1 && (
        <>
          <div className="relative max-w-max">
            <FaTrashCan
              size="20"
              className="absolute top-1 right-1 text-red-600 cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <Image
              src={images[0]}
              alt=""
              width="170"
              height="170"
              className="mt-3 rounded-md object-cover"
            />
          </div>
          <input type="hidden" value={images[0]} name="image" />
          <OverlayModal open={open} setOpen={setOpen} small>
            <p className="text-center text-lg my-4">
              Are you sure you want to delete this image?
            </p>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-slate-200 text-black w-20 rounded-md h-10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 w-20 rounded-md h-10 text-white"
              >
                Delete
              </button>
            </div>
          </OverlayModal>
        </>
      )}
    </>
  );
};

export default ImageInput;
