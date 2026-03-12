"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FormControl, FormGroup, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(),
    title: "New Assignment",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
    course: cid,
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, []);

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name"
          value={assignment.title}
          disabled={isStudent}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl as="textarea" id="wd-description" rows={10}
          value={assignment.description}
          disabled={isStudent}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-points">Points</FormLabel>
        <Col sm={9}>
          <FormControl id="wd-points" type="number"
            value={assignment.points}
            disabled={isStudent}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-group">Assignment Group</FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-group" defaultValue="ASSIGNMENTS" disabled={isStudent}>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-display-grade-as" defaultValue="Percentage" disabled={isStudent}>
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter Grade</option>
            <option value="Points">Points</option>
            <option value="Complete">Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-submission-type">Submission Type</FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormSelect id="wd-submission-type" defaultValue="Online" className="mb-3" disabled={isStudent}>
              <option value="Online">Online</option>
              <option value="Paper">On Paper</option>
              <option value="External">External Tool</option>
            </FormSelect>
            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" disabled={isStudent} />
            <FormCheck type="checkbox" id="wd-website-url" label="Website URL" className="mb-2" defaultChecked disabled={isStudent} />
            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" disabled={isStudent} />
            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" disabled={isStudent} />
            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" disabled={isStudent} />
          </div>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end">Assign</FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
            <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" disabled={isStudent} />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl type="date" id="wd-due-date"
              value={assignment.due}
              disabled={isStudent}
              onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
              className="mb-3" />

            <Row>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl type="date" id="wd-available-from"
                  value={assignment.available}
                  disabled={isStudent}
                  onChange={(e) => setAssignment({ ...assignment, available: e.target.value })} />
              </Col>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl type="date" id="wd-available-until"
                  value={assignment.until}
                  disabled={isStudent}
                  onChange={(e) => setAssignment({ ...assignment, until: e.target.value })} />
              </Col>
            </Row>
          </div>
        </Col>
      </FormGroup>

      <hr />
      <div className="d-flex justify-content-end">
        <Link href={`/courses/${cid}/assignments`}
          className="btn btn-secondary me-2" id="wd-cancel">
          Cancel
        </Link>
        {!isStudent && (
          <button onClick={handleSave}
            className="btn btn-danger" id="wd-save">
            Save
          </button>
        )}
      </div>
    </div>
  );
}