"use client"

import { ReactNode } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import Breadcrumb from "./breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
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
