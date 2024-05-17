import { Course } from "@/app/admin/page";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  query as fbQuery,
  orderBy,
} from "firebase/firestore";

export const fetchCoursesQueryKey = () => ["courses"];

export const useFetchCourses = () => {
  const query = useQuery({
    queryKey: fetchCoursesQueryKey(),
    queryFn: async (): Promise<Course[]> => {
      const q = fbQuery(collection(db, "courses"), orderBy("id"));
      const coursesRef = await getDocs(q);
      const courses = coursesRef.docs.map((doc) => doc.data());
      return (courses ?? []) as Course[];
    },
  });

  return query;
};
