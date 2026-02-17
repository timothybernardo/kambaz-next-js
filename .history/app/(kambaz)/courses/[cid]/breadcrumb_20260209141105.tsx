const section = pathname.split("/").pop();
  const capitalizedSection = section
    ? section.charAt(0).toUpperCase() + section.slice(1)
    : "";
  return (
    <span>
      Course {course?.name} &gt; {capitalizedSection}
    </span>
  );