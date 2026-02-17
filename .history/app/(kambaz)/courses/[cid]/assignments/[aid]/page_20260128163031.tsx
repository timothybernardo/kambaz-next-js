import { Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue="A1" />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
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
      </div>

      <Row className="mb-3">
        <Col sm={3}>
          <label htmlFor="wd-points" className="form-label text-end d-block">Points</label>
        </Col>
        <Col sm={9}>
          <input id="wd-points" className="form-control" type="number" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3}>
          <label htmlFor="wd-group" className="form-label text-end d-block">Assignment Group</label>
        </Col>
        <Col sm={9}>
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3}>
          <label htmlFor="wd-display-grade-as" className="form-label text-end d-block">Display Grade as</label>
        </Col>
        <Col sm={9}>
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter Grade</option>
            <option value="Points">Points</option>
            <option value="Complete">Complete/Incomplete</option>
          </select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3}>
          <label htmlFor="wd-submission-type" className="form-label text-end d-block">Submission Type</label>
        </Col>
        <Col sm={9}>
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-select mb-3" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="Paper">On Paper</option>
              <option value="External">External Tool</option>
            </select>

            <label className="fw-bold">Online Entry Options</label>
            <div className="form-check mb-2">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            <div className="form-check mb-2">
              <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            <div className="form-check mb-2">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>
            <div className="form-check mb-2">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" />
              <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3}>
          <label className="form-label text-end d-block">Assign</label>
        </Col>
        <Col sm={9}>
          <div className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="fw-bold">Assign to</label>
            <input id="wd-assign-to" className="form-control mb-3" defaultValue="Everyone" />

            <label htmlFor="wd-due-date" className="fw-bold">Due</label>
            <input
              type="datetime-local"
              id="wd-due-date"
              className="form-control mb-3"
              defaultValue="2024-05-13T23:59"
            />

            <Row>
              <Col sm={6}>
                <label htmlFor="wd-available-from" className="fw-bold">Available from</label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col sm={6}>
                <label htmlFor="wd-available-until" className="fw-bold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  className="form-control"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

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