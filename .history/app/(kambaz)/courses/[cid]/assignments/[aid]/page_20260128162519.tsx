import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaCaretDown, FaCheckCircle } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { Button, FormControl, InputGroup, InputGroupText, ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Search and Buttons Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroupText className="bg-white">
            <FaSearch className="text-secondary" />
          </InputGroupText>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <BsPlus className="fs-5" /> Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <BsPlus className="fs-5" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
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
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center" style={{ borderLeft: "4px solid green" }}>
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/123" className="text-decoration-none text-dark fw-bold">
                  A1
                </Link>
                <div style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |
                  <br />
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <FaCheckCircle className="text-success me-2 fs-5" />
              <IoEllipsisVertical className="fs-4" />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center" style={{ borderLeft: "4px solid green" }}>
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/124" className="text-decoration-none text-dark fw-bold">
                  A2
                </Link>
                <div style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |
                  <br />
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <FaCheckCircle className="text-success me-2 fs-5" />
              <IoEllipsisVertical className="fs-4" />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center" style={{ borderLeft: "4px solid green" }}>
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/125" className="text-decoration-none text-dark fw-bold">
                  A3
                </Link>
                <div style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |
                  <br />
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <FaCheckCircle className="text-success me-2 fs-5" />
              <IoEllipsisVertical className="fs-4" />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}