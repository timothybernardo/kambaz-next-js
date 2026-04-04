"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaCaretDown, FaCheckCircle } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { Button, FormControl, InputGroup, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import { RootState } from "@/app/(kambaz)/store";
import { setQuizzes, deleteQuiz, togglePublish, addQuiz } from "./reducer";
import * as client from "./client";
import { Quiz } from "./types";

function getAvailability(quiz: Quiz): string {
  const now = new Date();
  const avail = new Date(quiz.availableDate);
  const until = new Date(quiz.untilDate);
  if (quiz.availableDate && now > until) return "Closed";
  if (quiz.availableDate && now >= avail) return "Available";
  if (quiz.availableDate)
    return `Not available until ${avail.toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    })}`;
  return "Not available";
}

function formatDate(dateStr: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { quizzes } = useSelector((s: RootState) => s.quizzesReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.getQuizzesForCourse(cid)
      .then(data => dispatch(setQuizzes(data)))
      .finally(() => setLoading(false));
  }, [cid]);

  const courseQuizzes = quizzes.filter(q => q.course === cid);
  const visibleQuizzes = isFaculty
    ? courseQuizzes
    : courseQuizzes.filter(q => q.published);

  async function handleAdd() {
    const newQuiz = await client.createQuiz(cid, {
      title: "New Quiz", course: cid, description: "",
      quizType: "Graded Quiz", assignmentGroup: "Quizzes",
      points: 0, shuffleAnswers: true, timeLimit: 20,
      multipleAttempts: false, howManyAttempts: 1,
      showCorrectAnswers: false, accessCode: "",
      oneQuestionAtATime: true, webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "", availableDate: "", untilDate: "",
      published: false, questions: [],
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/details`);
  }

  async function handleDelete(qid: string) {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    await client.deleteQuiz(qid);
    dispatch(deleteQuiz(qid));
  }

  async function handleTogglePublish(quiz: Quiz) {
    await client.publishQuiz(quiz._id, !quiz.published);
    dispatch(togglePublish(quiz._id));
  }

  if (loading) return <div className="p-4">Loading quizzes...</div>;

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <span className="input-group-text bg-white">
            <FaSearch className="text-secondary" />
          </span>
          <FormControl placeholder="Search for Quiz" id="wd-search-quiz" />
        </InputGroup>
        {isFaculty && (
          <Button variant="danger" size="lg" id="wd-add-quiz-btn" onClick={handleAdd}>
            <BsPlus className="fs-5" /> Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <strong>ASSIGNMENT QUIZZES</strong>
            </div>
            <div className="d-flex align-items-center">
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {visibleQuizzes.length === 0 ? (
              <ListGroupItem className="ps-4 text-muted">
                No quizzes yet.{isFaculty && " Click + Quiz to add one."}
              </ListGroupItem>
            ) : (
              visibleQuizzes.map(quiz => {
                const due = formatDate(quiz.dueDate);
                return (
                  <ListGroupItem key={quiz._id}
                    id={`wd-quiz-list-item-${quiz._id}`}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                    style={{ borderLeft: "4px solid green" }}>
                    <BsGripVertical className="me-2 fs-3 text-secondary" />
                    <FaRocket className="me-3 fs-3 text-secondary" />

                    <div className="flex-grow-1" style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/details`)}>
                      <div className="fw-bold">{quiz.title}</div>
                      <div style={{ fontSize: "14px" }}>
                        <span className="text-danger">{getAvailability(quiz)}</span>
                        {due && <> | <strong>Due</strong> {due}</>}
                        {" "}| {quiz.points} pts
                        {" "}| {quiz.questions.length} Questions
                      </div>
                    </div>

                    <FaCheckCircle
                      className={`me-2 fs-5 ${quiz.published ? "text-success" : "text-secondary"}`}
                      style={{ cursor: isFaculty ? "pointer" : "default" }}
                      onClick={() => isFaculty && handleTogglePublish(quiz)}
                      title={quiz.published ? "Published (click to unpublish)" : "Unpublished (click to publish)"}
                    />
                    {isFaculty && (
                      <Dropdown align="end">
                        <Dropdown.Toggle bsPrefix="no-caret" variant="link" className="text-dark p-0 border-0">
                          <IoEllipsisVertical className="fs-4" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger"
                            onClick={() => handleDelete(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </ListGroupItem>
                );
              })
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}