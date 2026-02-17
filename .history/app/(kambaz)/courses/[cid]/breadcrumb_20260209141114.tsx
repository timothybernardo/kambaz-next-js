"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const section = pathname.split("/").pop();
  const capitalizedSection = section
    ? section.charAt(0).toUpperCase() + section.slice(1)
    : "";
  return (
    <span>
      Course {course?.name} &gt; {capitalizedSection}
    </span>
  );
}