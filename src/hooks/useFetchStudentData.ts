import { Course, Student } from "@/app/admin/page";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const fetchStudentDataQueryKey = (studentID?: string) => [
  "student",
  studentID,
];

export const useFetchStudentData = ({ studentID }: { studentID?: string }) => {
  const query = useQuery({
    queryKey: fetchStudentDataQueryKey(studentID),
    queryFn: async (): Promise<Student> => {
      const response = await getDoc(doc(db, "students", studentID ?? ""));
      return response.data() as Student;
    },
    enabled: !!studentID,
  });

  return query;
};
