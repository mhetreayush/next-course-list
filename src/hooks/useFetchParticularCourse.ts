import { Course } from "@/app/admin/page";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const fetchParticularCourseQueryKey = (courseID?: string) => [
  "courses",
  courseID,
];

export const useFetchParticularCourse = ({
  courseID,
}: {
  courseID?: string;
}) => {
  const query = useQuery({
    queryKey: fetchParticularCourseQueryKey(courseID),
    queryFn: async (): Promise<Course> => {
      const response = await getDoc(doc(db, "courses", courseID ?? ""));
      return response.data() as Course;
    },
    enabled: !!courseID,
  });

  return query;
};
