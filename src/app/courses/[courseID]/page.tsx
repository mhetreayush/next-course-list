"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Skeleton } from "@/components/Skeleton";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { useFetchParticularCourse } from "@/hooks/useFetchParticularCourse";
import { useParams } from "next/navigation";

const Home = () => {
  const { courseID } = useParams();
  const { data: course, isLoading } = useFetchParticularCourse({
    courseID: courseID as string,
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Skeleton width="240px" height="32px" />
        <Skeleton width="60px" height="32px" />
        <Skeleton width="120px" height="32px" />
        <Skeleton width="80px" height="32px" />
        <Skeleton width="180px" height="32px" />
        <Skeleton width="40px" height="32px" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <p className="text-2xl">{course?.name}</p>
        <StatusPill status={course?.enrollmentStatus} />
      </div>
      <p>{course?.instructor}</p>
      <p>{course?.description}</p>
      <p>{course?.duration}</p>
      <p>{course?.schedule}</p>
      <p>{course?.location}</p>
      <p>
        <b>Prerequisites:</b>
        <ul className="list-disc">
          {course?.prerequisites.map((prerequisite) => (
            <li key={prerequisite} className="list-item ml-4">
              {prerequisite}
            </li>
          ))}
        </ul>
      </p>
      <div className="md:w-1/2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base max-w-fit gap-2">
              <b>Syllabus</b>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc flex flex-col gap-2">
                {course?.syllabus.map((syllabus) => (
                  <li key={syllabus.content} className="list-item ml-4">
                    {syllabus.content}
                    {syllabus.topic}
                    {syllabus.content}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
