import { db } from "@/lib/firebase";
import { fetchStudentDataQueryKey } from "@/hooks/useFetchStudentData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";

const useMarkCourseAsCompleted = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({
      studentID,
      courseID,
      checked,
    }: {
      studentID: number;
      courseID: number;
      checked: boolean;
    }) => {
      const studentRef = doc(db, "students", studentID.toString());
      const studentCourses = (await getDoc(studentRef)).data()?.coursesEnrolled;
      const courseIndex = studentCourses.findIndex(
        (course: { courseID: number }) => course.courseID === courseID
      );
      studentCourses[courseIndex].completed = checked;
      studentCourses[courseIndex].progress = 100;
      await setDoc(
        studentRef,
        { coursesEnrolled: studentCourses },
        {
          merge: true,
        }
      );
      // @ts-expect-error
      queryClient.invalidateQueries(fetchStudentDataQueryKey(studentID));
    },
  });

  return mutate;
};

export { useMarkCourseAsCompleted };
