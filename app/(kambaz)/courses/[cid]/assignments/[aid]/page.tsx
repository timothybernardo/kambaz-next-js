"use client"
import { Form, FormControl, FormGroup, FormLabel, FormSelect, FormCheck, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl id="wd-name" defaultValue="A1" />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl
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
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-points">
          Points
        </FormLabel>
        <Col sm={9}>
          <FormControl id="wd-points" type="number" defaultValue={100} />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-group">
          Assignment Group
        </FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-display-grade-as">
          Display Grade as
        </FormLabel>
        <Col sm={9}>
          <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter Grade</option>
            <option value="Points">Points</option>
            <option value="Complete">Complete/Incomplete</option>
          </FormSelect>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end" htmlFor="wd-submission-type">
          Submission Type
        </FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormSelect id="wd-submission-type" defaultValue="Online" className="mb-3">
              <option value="Online">Online</option>
              <option value="Paper">On Paper</option>
              <option value="External">External Tool</option>
            </FormSelect>

            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
            <FormCheck
              type="checkbox"
              id="wd-text-entry"
              label="Text Entry"
              className="mb-2"
            />
            <FormCheck
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
              className="mb-2"
              defaultChecked
            />
            <FormCheck
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
              className="mb-2"
            />
            <FormCheck
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
              className="mb-2"
            />
            <FormCheck
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assign
        </FormLabel>
        <Col sm={9}>
          <div className="border rounded p-3">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
            <FormControl
              id="wd-assign-to"
              defaultValue="Everyone"
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl
              type="datetime-local"
              id="wd-due-date"
              defaultValue="2024-05-13T23:59"
              className="mb-3"
            />

            <Row>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col sm={6}>
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </FormGroup>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" id="wd-cancel">
          Cancel
        </Button>
        <Button variant="danger" id="wd-save">
          Save
        </Button>
      </div>
    </div>
  );
}