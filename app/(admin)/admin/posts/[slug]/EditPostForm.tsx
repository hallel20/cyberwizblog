"use client";

import ImageUploadModal from "@/components/reusable/ImageUploadModal";
import Spinner from "@/components/reusable/Spinner";
import UploadImage from "@/components/UploadImage";
import { updatePost } from "@/lib/actions";
import { getCategories } from "@/lib/data";
import { PostFormType } from "@/lib/formTypes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const EditPost = ({ post }: { post: any }) => {
  const [categories, setCategories] = useState<any[]>();
  const [error, setError] = useState("");
  //   console.log(post);
  const [images, setImages] = useState<string[] | undefined>([
    post.images[0].url,
  ]);
  const [loading, setLoading] = useState(false);
  const { register, control, reset, handleSubmit } = useForm<PostFormType>({
    defaultValues: {
      title: post.title,
      content: post.content,
      categoryId: post.categoryId,
      tags: post.tags,
    },
  });

  useEffect(() => {
    const getCats = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    getCats();
  }, []);

  return (
    <form className="bg-white rounded-lg shadow-lg p-6 font-sans max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Header with title, save, and preview buttons */}
        <header className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts"
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
            >
              <FaArrowCircleLeft size="30" />
            </Link>
            <input
              type="text"
              placeholder="Enter Title"
              className="text-3xl font-bold w-full p-2 border-b border-gray-300 focus:border-gray-400 outline-none"
              {...register("title")}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSubmit(async (data) => {
                try {
                  setLoading(true);
                  await updatePost(data, post.id);
                  setLoading(false);
                } catch (ex) {
                  setError("Something went wrong. Please try again!");
                  setLoading(false);
                }
              })}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Save {loading && <Spinner />}
            </button>
            <Link
              href={`/admin/posts/${post.slug}/preview`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Preview
            </Link>
          </div>
        </header>

        {/* Main content editor */}
        <div className="flex mt-6">
          <div className="w-2/3 mr-8">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <SimpleMdeReact
                  placeholder="Edit your post here..."
                  className="w-full p-2 rounded border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              )}
            />
            <UploadImage />
          </div>

          {/* Sidebar */}
          <aside className="w-1/3 space-y-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Category</label>
              <select
                {...register("categoryId")}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                {categories?.map((category: any) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Tags</label>
              <input
                type="text"
                {...register("tags")}
                placeholder="Add tags"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Featured Image</label>
              {images && (
                <>
                  <input
                    type="hidden"
                    defaultValue={images[0]}
                    {...register("image")}
                  />
                  <Image
                    src={images[0]}
                    alt=""
                    width="150"
                    height="150"
                    className="object-cover rounded-lg"
                  />
                </>
              )}
            </div>
            <ImageUploadModal setImages={setImages} single />

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Status</label>
              <select
                {...register("status")}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
