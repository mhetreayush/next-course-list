"use client";

import { useCourseSearch } from "@/hooks/useCourseSearch";

const CourseSearch = () => {
  const { updateSearch, searchTerm } = useCourseSearch();
  return (
    <input
      placeholder="Search courses"
      className="md:w-1/4 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300"
      type="search"
      onChange={(e) => updateSearch(e.target.value)}
      value={searchTerm}
    />
  );
};

export { CourseSearch };
