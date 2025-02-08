"use client";

import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { useCallback, useEffect, useState } from "react";
import ImageUploadModal from "@/components/reusable/ImageUploadModal";
import { getCategories, getPost } from "@/lib/data";
import Image from "next/image";
import { createPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Spinner from "@/components/reusable/Spinner";
import { PostFormType } from "@/lib/formTypes";
import debounce from "lodash.debounce";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { host } from "@/lib/global";

const PostForm = () => {
  const [categories, setCategories] = useState<any[]>();
  const [images, setImages] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const [slugTaken, setSlugTaken] = useState<boolean>();
  const [error, setError] = useState<string>();

  const router = useRouter();

  const { register, control, handleSubmit, watch } = useForm<PostFormType>();

  const slug = watch("slug");

  // Define the debounced function to check the database
  const checkSlug = useCallback(
    debounce(async (slug: string | undefined) => {
      if (slug) {
        try {
          const slugTaken = await getPost(slug);
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

  useEffect(() => {
    const getStateCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (ex) {
        setError("Could not fetch categories!");
      }
    };

    getStateCategories();
  }, []);

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
      onSubmit={handleSubmit(async (data) => {
        try {
          setLoading(true);
          await createPost(data);
          setLoading(false);
          router.push("/admin/posts/");
        } catch (ex) {
          setError("Something went wrong, please try again!");
          setLoading(false);
        }
      })}
    >
      {/* Handle Errors */}
      {error && (
        <p className="text-red-500 font-semibold text-center mb-4">{error}</p>
      )}

      {/* Post Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          placeholder="Enter your post title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Featured Image */}
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Featured Image
        </label>
        {images?.length === 1 && (
          <>
            <Image
              src={`${host}/${images[0]}`}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover object-top"
            />
            <input type="hidden" {...register("image")} value={images[0]} />
          </>
        )}
        <ImageUploadModal setImages={setImages} />
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Post Content
        </label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              className="w-full"
              placeholder="Write your content here..."
              {...field}
            />
          )}
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-2"
        >
          Category
        </label>
        <select
          id="category"
          defaultValue=""
          {...register("categoryId")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            ---
          </option>
          {categories?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Slug */}
      <div className="mb-4">
        <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">
          Slug
        </label>
        {slugTaken && <div className="text-red-500 mb-2">Slug is taken!</div>}
        <div
          className={`w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg ${
            slugTaken ? "ring-1 ring-red-500" : ""
          }`}
        >
          <input
            type="text"
            id="slug"
            {...register("slug")}
            placeholder="Enter category slug (URL-friendly)"
            className="w-full focus:outline-none"
          />
          <div className="ml-2">
            {!slugTaken ? (
              <IoMdCheckmarkCircle className="text-green-500" size="25" />
            ) : (
              <FaXmark className="text-red-500" size="25" />
            )}
          </div>
        </div>
        <small className="text-gray-600">Example: technology-is-fun</small>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          {...register("tags")}
          placeholder="Enter tags separated by commas"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <small className="text-gray-600">Example: travel, tips, guides</small>
      </div>

      {/* Post Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
          Post Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={loading || slugTaken}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
        >
          Create Post {loading && <Spinner />}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
