"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardText, Button, FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import * as client from "../courses/client";
import { RootState } from "../store";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const isStudent = currentUser?.role === "STUDENT";
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const data = showAllCourses
        ? await client.findAllCourses()
        : await client.findMyCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAllCourses]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) =>
      c._id === course._id ? course : c
    )));
  };

  const onEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollInCourse(courseId);
    await fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId);
    await fetchCourses();
  };

  const isEnrolled = (courseId: string) =>
    !showAllCourses || courses.some((c: any) => c._id === courseId);

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard
        <Button variant="primary" className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn">
          Enrollments
        </Button>
      </h1>
      <hr />

      {!isStudent && (
        <>
          <h5 className="clearfix">New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click">
              Update
            </button>
          </h5>
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course">
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg variant="top"
                    src={course.image || "/images/reactjs.jpg"}
                    width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                  </CardBody>
                </Link>
                <CardBody>
                  <Link href={`/courses/${course._id}/home`}
                    className="btn btn-primary">
                    Go
                  </Link>
                  {showAllCourses && isStudent && (
                    isEnrolled(course._id) ? (
                      <button
                        onClick={(e) => { e.preventDefault(); onUnenroll(course._id); }}
                        className="btn btn-danger float-end"
                        id="wd-unenroll-btn">
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.preventDefault(); onEnroll(course._id); }}
                        className="btn btn-success float-end"
                        id="wd-enroll-btn">
                        Enroll
                      </button>
                    )
                  )}
                  {!showAllCourses && isStudent && (
                    <button
                      onClick={(e) => { e.preventDefault(); onUnenroll(course._id); }}
                      className="btn btn-danger float-end"
                      id="wd-unenroll-btn">
                      Unenroll
                    </button>
                  )}
                  {!isStudent && (
                    <>
                      <button
                        onClick={(e) => { e.preventDefault(); onDeleteCourse(course._id); }}
                        className="btn btn-danger float-end me-2"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(e) => { e.preventDefault(); setCourse(course); }}
                        className="btn btn-warning me-2 float-end">
                        Edit
                      </button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}