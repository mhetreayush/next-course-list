"use client";

import { Skeleton } from "@/components/Skeleton";
import { useParams } from "next/navigation";
import { useFetchStudentData } from "@/hooks/useFetchStudentData";
import { useFetchStudentCourses } from "@/hooks/useFetchStudentCourses";
import { useCourseSearch } from "@/hooks/useCourseSearch";
import FuzzySearch from "fuzzy-search";
import { useMarkCourseAsCompleted } from "@/hooks/useMarkCourseAsCompleted";

export default function Home() {
  const { studentID } = useParams();
  const { data: studentCoursesStatus, isLoading } = useFetchStudentData({
    studentID: studentID as string,
  });
  const { data: studentCourses } = useFetchStudentCourses({
    studentID: studentID as string,
    courses:
      studentCoursesStatus?.coursesEnrolled?.map((course) => course.courseID) ??
      [],
  });
  const { searchTerm } = useCourseSearch();
  const searcher = new FuzzySearch(
    studentCourses ?? [],
    ["name", "instructor"],
    {
      sort: true,
    }
  );
  const result = searcher.search(searchTerm);
  const { mutate: markCourseAsCompleted } = useMarkCourseAsCompleted();
  if (isLoading) {
    return (
      <div className="flex flex-col md:grid grid-cols-2 gap-8">
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
        {result?.map((course) => {
          const courseStatus = studentCoursesStatus?.coursesEnrolled?.find(
            (_course) => _course.courseID === course.id
          );
          return (
            <div key={course.id}>
              <div className="min-h-full flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:border-gray-500 transition-colors duration-300 justify-between">
                <div>
                  <div className="flex w-full justify-between items-center">
                    <h2 className="text-lg font-semibold">{course.name}</h2>
                    <div>
                      <label
                        htmlFor={`${course.id}-completed`}
                        className="flex gap-2 items-center p-2 rounded-md cursor-pointer border border-gray-200 hover:border-gray-500 transition-colors duration-300"
                      >
                        <input
                          type="checkbox"
                          id={`${course.id}-completed`}
                          onChange={(e) => {
                            console.log(e.target.checked);
                            markCourseAsCompleted({
                              studentID: studentID as unknown as number,
                              courseID: course.id,
                              checked: e.target.checked,
                            });
                          }}
                          checked={courseStatus?.completed}
                        />
                        Completed
                      </label>
                    </div>
                  </div>
                  <p className="max-w-[75%] text-gray-500">
                    {course.description}
                  </p>
                </div>
                <p className="text-gray-500">
                  Instructor:{" "}
                  <span className="font-bold text-black">
                    {course.instructor}
                  </span>
                </p>
                <p>Due date: {courseStatus?.dueDate}</p>
                <p>
                  Progress:
                  <div className="w-full h-4 rounded-full bg-gray-100 border border-gray-200">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${studentCoursesStatus?.coursesEnrolled?.find((_course) => _course.courseID === course.id)?.progress}%`,
                      }}
                    />
                  </div>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
