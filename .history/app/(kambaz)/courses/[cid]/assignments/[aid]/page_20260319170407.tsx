"use client";
import { useParams } from "next/navigation";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaCaretDown, FaCheckCircle, FaTrash } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const onDeleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
  };

  const onCreateAssignment = async () => {
    const newAssignment = { title: "New Assignment", course: cid };
    const assignment = await client.createAssignment(cid as string, newAssignment);
    dispatch(setAssignments([...assignments, assignment]));
    router.push(`/courses/${cid}/assignments/${assignment._id}`);
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <span className="input-group-text bg-white">
            <FaSearch className="text-secondary" />
          </span>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment" />
        </InputGroup>
        {!isStudent && (
          <div>
            <Button variant="secondary" size="lg" className="me-2"
              id="wd-add-assignment-group">
              <BsPlus className="fs-5" /> Group
            </Button>
            <Button variant="danger" size="lg" id="wd-add-assignment"
              onClick={onCreateAssignment}>
              <BsPlus className="fs-5" /> Assignment
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div className="d-flex align-items-center">
              <span className="border rounded-pill px-3 py-1 me-2" style={{ fontSize: "14px" }}>
                40% of Total
              </span>
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroupItem key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
                style={{ borderLeft: "4px solid green" }}>
                <BsGripVertical className="me-2 fs-3 text-secondary" />
                <LuNotebookPen className="me-3 fs-3 text-success" />
                <div className="flex-grow-1">
                  <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="text-decoration-none text-dark fw-bold">
                    {assignment.title}
                  </Link>
                  <div style={{ fontSize: "14px" }}>
                    <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> {assignment.available} |
                    <br />
                    <strong>Due</strong> {assignment.due} | {assignment.points} pts
                  </div>
                </div>
                <FaCheckCircle className="text-success me-2 fs-5" />
                {!isStudent && (
                  <FaTrash className="text-danger me-2 fs-5"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to delete this assignment?")) {
                        onDeleteAssignment(assignment._id);
                      }
                    }} />
                )}
                <IoEllipsisVertical className="fs-4" />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}