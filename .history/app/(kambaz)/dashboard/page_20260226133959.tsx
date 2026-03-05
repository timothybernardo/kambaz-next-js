"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardText, Button, FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";
import * as db from "../database";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5 className="clearfix">New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse({ ...course, _id: uuidv4() }))}>
          Add
        </button>
        <button className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"> Update </button>
      </h5>
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" value={course.description} rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.filter((course: any) =>
          enrollments.some((enrollment: any) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === course._id
          )).length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses
            .filter((course: any) =>
              enrollments.some((enrollment: any) =>
                enrollment.user === currentUser?._id &&
                enrollment.course === course._id
              ))
            .map((course: any) => (
              <Col key={course._id} className="wd-dashboard-course">
                <Card>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg variant="top"
                      src={course.image || "/images/reactjs.jpg"}
                      width="100%" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.number} {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}>
                        {course.description}
                      </CardText>
                      <Button variant="primary">Go</Button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id));
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end">
                        Edit
                      </button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}