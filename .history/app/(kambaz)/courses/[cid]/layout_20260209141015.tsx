import { ReactNode } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import Breadcrumb from "./breadcrumb";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="d-flex">
      <div style={{ width: "250px" }}>
        <CourseNavigation cid={cid} />
      </div>

      <div className="flex-fill p-4">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
           <Breadcrumb course={course} />
        </h2>

        {children}
      </div>
    </div>
  );
}
