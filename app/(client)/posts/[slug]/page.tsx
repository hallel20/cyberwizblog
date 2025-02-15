//@ts-nocheck
import DOMPurify from "isomorphic-dompurify";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPost } from "@/lib/data";
import { marked } from "marked";
import md5 from "md5";
import { getServerSession } from "next-auth";
import { newComment } from "@/lib/actions";
import Comment from "./SubmitComment";
import Image from "next/image";
import { host } from "@/lib/global";

export default async function SinglePost({ params }: any) {
  const { slug } = params; // Get the post ID from the URL
  const post = await getPost(slug);

  const session = await getServerSession();
  // console.log(session);

  if (!post) {
    return <p className="text-3xl">Not found</p>;
  }

  const html_body = await marked(post.content);

  const cleanBody = DOMPurify.sanitize(html_body);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Post Meta (Author, Category, Date) */}
        <p className="text-gray-500 mb-6">
          By {post.user.username} in{" "}
          <span className="text-blue-500">{post.category.name}</span> •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.split(",").map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Post Image */}
        {post.images && (
          <div className="my-6">
            <Image
              width="1000"
              height="1000"
              src={`${host}/${post.images[0].url}`}
              alt="Post Image"
              className="w-full rounded-md"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className="mx-auto">
          <div className="prose">
            <div
              className="text-gray-700 w-full"
              dangerouslySetInnerHTML={{ __html: cleanBody }}
            />
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-8 bg-gray-100 p-4 rounded-md flex items-center">
          <Image
            width="200"
            height="200"
            src={`https://www.gravatar.com/avatar/${md5(post.user.email)}`}
            alt={post.user.firstname + " " + post.user.lastname}
            className="h-16 w-16 rounded-full mr-4"
          />
          <div>
            <h4 className="font-bold text-lg">{post.user.username}</h4>
            <p className="text-gray-600">{post.user.bio}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {/* Comment Form */}
          {session ? (
            <Comment post={post} />
          ) : (
            <p className="text-blue-500 font-bold">
              You need to login to add comments!
            </p>
          )}

          {/* Existing Comments */}
          <div className="space-y-4">
            {post.comments.map(
              (comment: any, idx: number) =>
                comment.status == "approved" && (
                  <div key={idx} className="bg-gray-100 p-4 rounded-md">
                    <p className="font-bold">{comment.user.username}</p>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
