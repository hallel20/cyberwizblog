"use client";
import Button from "@/components/reusable/Button";
import ImageUploadModal from "@/components/reusable/ImageUploadModal";
import Spinner from "@/components/reusable/Spinner";
import { createCategory } from "@/lib/actions";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import debounce from "lodash.debounce";
import { getCategory } from "@/lib/data";
import { FaXmark } from "react-icons/fa6";
import { host } from "@/lib/global";

export interface CategoryForm {
  name: string;
  description: string;
  slug: string;
  image: string;
}

const NewCategory = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [images, setImages] = useState<string[]>();
  const [error, setError] = useState<any>();
  const [slugTaken, setSlugTaken] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const { register, reset, handleSubmit, watch } = useForm<CategoryForm>();

  const slug = watch("slug");

  // Define the debounced function to check the database
  const checkSlug = useCallback(
    debounce(async (slug: string) => {
      if (slug) {
        try {
          const slugTaken = await getCategory(slug);
          if (slugTaken) setSlugTaken(true);
          else setSlugTaken(false);
        } catch (error) {
          console.error("Error checking slug:", error);
        }
      }
    }, 2000), // 2-second debounce
    []
  );

  useEffect(() => {
    checkSlug(slug);
  }, [slug, checkSlug]);

  return (
    <div className="container mx-auto py-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Create New Category
        </h1>
        <button
          onClick={() => {
            setOpen(false);
            reset();
            setSlugTaken(undefined);
          }}
          className="rounded-lg shadow p-2"
        >
          <IoMdCloseCircle size="30" />
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setLoading(true);
              await createCategory(data);
              reset();
              setOpen(false);
              setLoading(false);
              setImages([]);
            } catch (ex) {
              setError(ex);
              setLoading(false);
            }
          })}
        >
          {error && <p className="text-center text-red-500">{error}</p>}
          {/* Category Name */}
          <div className="mb-4">
            <label
              htmlFor="category_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category_name"
              {...register("name")}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Description */}
          <div className="mb-4">
            <label
              htmlFor="category_description"
              className="block text-gray-700 font-bold mb-2"
            >
              Category Description
            </label>
            <textarea
              id="category_description"
              {...register("description")}
              rows={4}
              placeholder="Enter category description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          {/* Category Slug */}
          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-gray-700 font-bold mb-2"
            >
              Category Slug
            </label>
            {slugTaken && (
              <div className="text-red-500 mb-2">Slug is taken!</div>
            )}
            <div
              className={`w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg ring-1 ${
                slugTaken ? "ring-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="slug"
                {...register("slug")}
                placeholder="Enter category slug (URL-friendly)"
                className="w-full focus:outline-none"
              />
              <div className="">
                {!slugTaken ? (
                  <div className="text-green-500">
                    <IoMdCheckmarkCircle size="25" />
                  </div>
                ) : (
                  <div className="text-red-500">
                    <FaXmark size="25" />
                  </div>
                )}
              </div>
            </div>

            <small className="text-gray-600">Example: technology-news</small>
          </div>

          {/* Category Image */}
          <ImageUploadModal setImages={setImages} single />
          {images && (
            <>
              <Image
                src={`${images[0]}`}
                alt=""
                width="170"
                height="170"
                objectFit="cover"
                className="mt-3 rounded-md"
              />
              <input type="hidden" value={images[0]} {...register("image")} />
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              Create Category{loading && <Spinner />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
