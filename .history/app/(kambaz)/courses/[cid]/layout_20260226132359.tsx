"use client"

import { ReactNode } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import Breadcrumb from "./breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
const { cid } = useParams();
const { courses } = useSelector((state: RootState) => state.coursesReducer);
const course = courses.find((course: any) => course._id === cid);

  return (
<div id=
"wd-courses">
<h2>
<FaAlignJustify className=
"me-4 fs-4 mb-1" />
{course?.name}
</h2>
<hr />
<div className=
"d-flex">
<div>
<CourseNavigation />
</div>
<div className=
"flex-fill">{children}</div>
</div>
</div>
);
}