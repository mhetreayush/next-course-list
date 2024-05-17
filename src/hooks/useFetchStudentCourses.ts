import { Course } from "@/app/admin/page";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, where } from "firebase/firestore";

export const fetchStudentCoursesQueryKey = (studentID?: string) => [
  "studentCourses",
  studentID,
];

export const useFetchStudentCourses = ({
  studentID,
  courses,
}: {
  studentID?: string;
  courses: number[];
}) => {
  const query = useQuery({
    queryKey: fetchStudentCoursesQueryKey(studentID),
    queryFn: async (): Promise<Course[]> => {
      // get all courses with course id in courses
      const courseDocs = await Promise.all(
        courses.map((courseID) =>
          getDoc(doc(db, "courses", courseID.toString()))
        )
      );
      return courseDocs.map((courseDoc) => courseDoc.data() as Course);
    },
    enabled: courses.length > 0,
  });

  return query;
};
