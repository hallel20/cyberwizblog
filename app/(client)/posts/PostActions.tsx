"use client";
import DeletePost from "@/app/(admin)/admin/posts/DeletePost";
import { Post } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostActions = ({ post }: { post: Post }) => {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    const effect = async () => {
      const session = await getSession();
      setSession(session);
    };

    effect();
  }, []);
  return (
    session?.user &&
    session.user.role == "admin" && (
      <div className="flex justify-end gap-2">
        <Link
          href={`/admin/posts/${post.slug}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Edit
        </Link>
        <DeletePost id={post.id} name={post.title} />
      </div>
    )
  );
};

export default PostActions;
