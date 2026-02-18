import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
        <Form.Control id="wd-name" defaultValue="A1" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          id="wd-description"
          rows={10}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end" htmlFor="wd-points">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control id="wd-points" type="number" defaultValue={100} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end" htmlFor="wd-display-grade-as">
          Display Grade as
        </Form.Label>
        <Col sm={9}>
          <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter Grade</option>
            <option value="Points">Points</option>
            <option value="Complete">Complete/Incomplete</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end" htmlFor="wd-submission-type">
          Submission Type
        </Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
              <option value="Online">Online</option>
              <option value="Paper">On Paper</option>
              <option value="External">External Tool</option>
            </Form.Select>

            <Form.Label className="fw-bold">Online Entry Options</Form.Label>
            <Form.Check
              type="checkbox"
              id="wd-text-entry"
              label="Text Entry"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
              className="mb-2"
              defaultChecked
            />
            <Form.Check
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end">
          Assign
        </Form.Label>
        <Col sm={9}>
          <div className="border rounded p-3">
            <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
            <Form.Control
              id="wd-assign-to"
              defaultValue="Everyone"
              className="mb-3"
            />

            <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
            <Form.Control
              type="datetime-local"
              id="wd-due-date"
              defaultValue="2024-05-13T23:59"
              className="mb-3"
            />

            <Row>
              <Col sm={6}>
                <Form.Label htmlFor="wd-available-from" className="fw-bold">Available from</Form.Label>
                <Form.Control
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col sm={6}>
                <Form.Label htmlFor="wd-available-until" className="fw-bold">Until</Form.Label>
                <Form.Control
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Form.Group>

      <hr />
      <div className="d-flex justify-content-end">
        <Link href="/courses/1234/assignments" className="btn btn-secondary me-2" id="wd-cancel">
          Cancel
        </Link>
        <Link href="/courses/1234/assignments" className="btn btn-danger" id="wd-save">
          Save
        </Link>
      </div>
    </div>
  );
}