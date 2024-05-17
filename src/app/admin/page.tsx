"use client";

import { Button } from "@/components/Button/Button";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { faker } from "@faker-js/faker";
export type Student = {
  id: number;
  name: string;
  email: string;
  coursesEnrolled: {
    courseID: number;
    progress: number;
    completed: boolean;
    dueDate: string;
  }[];
};

type Syllabus = {
  week: number;
  topic: string;
  content: string;
};

export type EnrollmentStatus = "Open" | "Closed" | "In Progress";

export type Course = {
  id: number;
  name: string;
  description: string;
  students: Omit<Student, "coursesEnrolled">[];
  instructor: string;
  enrollmentStatus: EnrollmentStatus;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: Syllabus[];
};

const createCourse = (i: number): Course => {
  const enrollmentStatus: EnrollmentStatus[] = [
    "Open",
    "Closed",
    "In Progress",
  ];
  const randomIndex = Math.floor(Math.random() * enrollmentStatus.length);
  const currentStatus = enrollmentStatus[randomIndex];
  const randomStudentIDs = [];
  const numberOfStudents = Math.floor(Math.random() * 4) + 1;
  for (var j = 0; j < numberOfStudents; j++) {
    const randomStudentIndex = Math.floor(Math.random() * 100) + 1;
    randomStudentIDs.push(randomStudentIndex);
  }
  const students = randomStudentIDs.map((id) => {
    return {
      id: id,
      name: `Student ${id}`,
      email: `student${id}@email.com`,
    };
  });

  return {
    id: i,
    name: faker.word.words(2),
    description: faker.lorem.paragraph(),
    students,
    instructor: faker.name.firstName(),
    enrollmentStatus: currentStatus,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg",
    duration: `8 weeks`,
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to React Native",
        content:
          "Overview of React Native, setting up your development environment.",
      },
      {
        week: 2,
        topic: "Building Your First App",
        content: "Creating a simple mobile app using React Native components.",
      },
    ],
  };
};

const createStudent = (i: number): Student => {
  const numberOfCourses = Math.floor(Math.random() * 4) + 1;
  var studentCourses = [];
  for (var j = 0; j < numberOfCourses; j++) {
    const randomCourseIndex = Math.floor(Math.random() * 100) + 1;
    studentCourses.push({
      courseID: randomCourseIndex,
      progress: Math.floor(Math.random() * 60) + 1,
      completed: false,
      dueDate: faker.date.future().toISOString(),
    });
  }
  return {
    id: i,
    name: `Student ${i}`,
    email: `student${i}@email.com`,
    coursesEnrolled: studentCourses,
  };
};

const addCoursesToDB = async () => {
  var courses = [];
  for (var i = 1; i <= 100; i++) {
    courses.push(createCourse(i));
  }
  const promises = courses.map(async (course) => {
    return await setDoc(doc(db, "courses", course.id.toString()), course);
  });

  await Promise.all(promises);
};

const addStudentsToDB = async () => {
  var students = [];
  for (var i = 1; i <= 100; i++) {
    students.push(createStudent(i));
  }

  const promises = students.map(async (student) => {
    return await setDoc(doc(db, "students", student.id.toString()), student);
  });

  await Promise.all(promises);
};

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>

      <div className="flex flex-col gap-4 items-start">
        {/* @ts-expect-error Button only accepts void as onclick, not promise */}
        <Button onClick={addCoursesToDB}>Add Courses</Button>
        {/* @ts-expect-error Button only accepts void as onclick, not promise */}
        <Button onClick={addStudentsToDB}>Add Students</Button>
      </div>
    </div>
  );
};

export default Admin;
