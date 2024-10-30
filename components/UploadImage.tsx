"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaCamera, FaTrashCan } from "react-icons/fa6";
import Spinner from "@/components/reusable/Spinner";
import { MdClose } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { host } from "@/lib/global";

const UploadImage = () => {
  const [urls, setUrls] = useState<string[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let image = new FormData();
    const files = e.currentTarget.files!;
    image.append("image", files[0]);
    try {
      setLoading(true);
      const res: any = await axios.post("/api/uploads", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(res);
      if (res.status === 200) {
        const url = res.data;
        // console.log(res.data);
        const newUrls = urls ? [...urls, url] : [url];
        setUrls(newUrls);
      } else if (res.status === 400) {
        setError(res.data.error);
      } else {
        setError("Something went wrong, Please try again!");
      }
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    } catch (ex) {
      setError("Something went wrong, Please try again!");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const handleCopy = (image: string) => {
    navigator.clipboard.writeText(host + image);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleRemove = async (image: string) => {
    const newUrls = urls && urls.filter((url) => image != url);
    try {
      setUrls(newUrls);
      await axios.post("/api/uploads/delete", { image });
    } catch (ex) {
      setUrls(urls);
      console.log(ex);
    }
  };
  //   console.log(urls);

  return (
    <div className="w-10/12 min-h-96 bg-white p-5 rounded-lg relative flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        <em>
          You can upload extra images for the post here, copy the link, paste in
          the editor and preview post
        </em>
      </p>
      <h1 className="text-2xl font-semibold mb-6">Upload an Image</h1>
      <div className="flex flex-col gap-2">
        {urls &&
          urls.length > 0 &&
          urls.map((image) => (
            <>
              <div className="h-40 w-40 relative" key={image}>
                <div
                  onClick={() => handleRemove(image)}
                  className="absolute cursor-pointer -top-1 -right-1 text-xs rounded-lg flex items-center justify-center p-1 bg-slate-100 text-red-500"
                >
                  <FaTrashCan size="20" />
                </div>
                <Image
                  src={image}
                  width="100"
                  height="100"
                  alt=""
                  className="object-cover rounded-lg h-40 w-40 object-center"
                />
              </div>
              <p
                className="flex gap-2 cursor-pointer text-slate-800 hover:text-blue-800 items-center text-[8px]"
                onClick={() => handleCopy(image)}
              >
                {copied ? (
                  "Copied"
                ) : (
                  <span>
                    {host + image} <FaCopy size="10" />
                  </span>
                )}
              </p>
            </>
          ))}

        <label className="p-4 rounded-md cursor-pointer bg-slate-500 text-3xl flex max-w-max text-white">
          <FaCamera size="55" />
          <input
            type="file"
            name=""
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {loading && (
          <p>
            Uploading Image <Spinner />
          </p>
        )}
      </div>

      {error !== "" && <p className="p-2 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default UploadImage;
