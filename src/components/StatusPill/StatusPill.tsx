import { EnrollmentStatus } from "@/app/admin/page";

const StatusPill = ({ status }: { status?: EnrollmentStatus }) => {
  if (!status) return null;
  const fixedClasses = "rounded-full px-4 py-1 border w-fit h-fit";
  switch (status) {
    case "Open":
      return (
        <span
          className={`bg-green-100 text-green-800 border-green-300 ${fixedClasses}`}
        >
          Open
        </span>
      );
    case "Closed":
      return (
        <span
          className={`bg-red-100 text-red-800 border-red-300 ${fixedClasses}`}
        >
          Closed
        </span>
      );
    case "In Progress":
      return (
        <span
          className={`bg-yellow-100 text-yellow-800 border-yellow-300 ${fixedClasses}`}
        >
          In Progress
        </span>
      );
    default:
      return null;
  }
};

export { StatusPill };
