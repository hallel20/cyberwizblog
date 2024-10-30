"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { Post } from "@prisma/client";
import { marked } from "marked";
import Image from "next/image";

type PostSliderProps = {
  posts: Post[];
};

export default function PostSlider({ posts }: PostSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{ delay: 5000 }}
      className="w-full max-w-3xl"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <div className="relative bg-gray-100 p-6 rounded-lg shadow-lg">
            <Image
              src={post.images[0].url}
              alt={post.title}
              width="1000"
              height="1000"
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{
                __html: marked(post.content.substring(0, 50)),
              }}
            />
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
