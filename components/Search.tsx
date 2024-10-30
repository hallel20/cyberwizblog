"use client";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Post = {
  id: number;
  title: string;
  content: string;
};

const Search = () => {
  const router = useRouter();

  // Stable debounced function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      router.push(`/search?q=${query}`);
    }, 2000),
    []
  );

  // Handle change and call debounced search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  return (
    <div className="max-w-96 p-2 border text-black bg-white border-gray-300 rounded-md flex items-center gap-2">
      <FaSearch />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search posts..."
        className="placeholder:text-gray-500 bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Search;
