"use client";

import { Skeleton } from "@/components/Skeleton";
import { useFetchCourses } from "@/hooks/useFetchCourses";
import Link from "next/link";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import FuzzySearch from "fuzzy-search";
import { useCourseSearch } from "@/hooks/useCourseSearch";

export default function Home() {
  const { data, isLoading } = useFetchCourses();
  const { searchTerm } = useCourseSearch();
  const searcher = new FuzzySearch(data ?? [], ["name", "instructor"], {
    sort: true,
  });
  const result = searcher.search(searchTerm);
  if (isLoading) {
    return (
      <div className="flex flex-col md:grid grid-cols-3 gap-x-8 gap-y-4">
        {Array.from({ length: 20 }).map((_, index) => {
          return (
            <div
              className="flex flex-col gap-2 border border-gray-200 rounded-md p-4"
              key={index}
            >
              <Skeleton width="120px" height="30px" />
              <Skeleton width="240px" height="30px" />
              <Skeleton width="240px" height="30px" />
              <Skeleton width="60px" height="30px" />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="relative flex flex-col gap-4 w-full">
      <div className="flex flex-col md:grid grid-cols-2 gap-8">
        {result.map((course) => {
          return (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="min-h-full flex flex-col gap-8 border border-gray-200 rounded-md p-4 hover:border-gray-500 transition-colors duration-300 justify-between">
                <div className="flex w-full gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.thumbnail}
                    className="w-24 h-24 rounded-md border border-gray-200"
                    alt={course.name}
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{course.name}</h2>
                    <p className=" text-gray-500">{course.description}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-500">
                    Instructor:{" "}
                    <span className="font-bold text-black">
                      {course.instructor}
                    </span>
                  </p>
                  <StatusPill status={course.enrollmentStatus} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
