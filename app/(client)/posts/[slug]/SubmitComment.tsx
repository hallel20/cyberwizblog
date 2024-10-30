"use client";

import Spinner from "@/components/reusable/Spinner";
import { newComment } from "@/lib/actions";
import { CommentForm } from "@/lib/formTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Comment = ({ post }: { post: any }) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setLoading(true);
          await newComment(data);
          setSuccess("Comment successfully added!");
          setLoading(false);
          reset();
        } catch (ex) {
          setError("Something went wrong. please try again!");
          setLoading(false);
        }
      })}
      className="mb-6"
    >
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}
      <input type="hidden" {...register("postId")} defaultValue={post.id} />
      <input type="hidden" {...register("slug")} defaultValue={post.slug} />
      <textarea
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Share your thoughts..."
        {...register("comment")}
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Post Comment {loading && <Spinner />}
      </button>
    </form>
  );
};

export default Comment;
