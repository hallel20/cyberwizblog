"use client";

import { getCategories } from "@/lib/data";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryBar = () => {
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    const updateState = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    updateState();
  }, []);
  return (
    <nav className="bg-gray-200 py-2">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-4 text-gray-700">
          <li>
            <Link href="/posts" className="hover:underline">
              Latest
            </Link>
          </li>
          {categories?.map(
            (category) =>
              category.id != 1 && (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryBar;
