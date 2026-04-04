"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";
import { BsSlashCircle, BsCheckCircleFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { RootState } from "@/app/(kambaz)/store";
import { setQuizzes, deleteQuiz, togglePublish, addQuiz } from "./reducer";
import * as client from "./client";
import { Quiz } from "./types";

function getAvailability(quiz: Quiz): { label: string; color: string } {
  const now = new Date();
  const avail = new Date(quiz.availableDate);
  const until = new Date(quiz.untilDate);
  if (quiz.availableDate && now > until) return { label: "Closed", color: "black" };
  if (quiz.availableDate && now >= avail) return { label: "Available", color: "black" };
  if (quiz.availableDate)
    return {
      label: `Not available until ${avail.toLocaleDateString("en-US", {
        month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
      })}`,
      color: "black",
    };
  return { label: "Not available", color: "black" };
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
  const [collapsed, setCollapsed] = useState(false);

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
    if (!confirm("Delete this quiz?")) return;
    await client.deleteQuiz(qid);
    dispatch(deleteQuiz(qid));
  }

  async function handleTogglePublish(quiz: Quiz) {
    await client.publishQuiz(quiz._id, !quiz.published);
    dispatch(togglePublish(quiz._id));
  }

  if (loading) return <div className="p-4">Loading quizzes...</div>;

  return (
    <div id="wd-quizzes" className="p-4">
      {/* ── Toolbar ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input className="form-control" style={{ width: 300 }}
          placeholder="Search for Quiz" />
        <div className="d-flex gap-2">
          {isFaculty && (
            <button className="btn btn-danger" onClick={handleAdd}>
              + Quiz
            </button>
          )}
        </div>
      </div>

      {/* ── Group Header ── */}
      <div className="border rounded">
        <div
          className="d-flex align-items-center p-3"
          style={{ backgroundColor: "#f5f5f5", borderBottom: visibleQuizzes.length > 0 && !collapsed ? "1px solid #dee2e6" : "none", cursor: "pointer" }}
          onClick={() => setCollapsed(c => !c)}
        >
          <span className="me-2" style={{ fontSize: 12 }}>{collapsed ? "▶" : "▼"}</span>
          <strong>Assignment Quizzes</strong>
        </div>

        {/* ── Quiz List ── */}
        {!collapsed && (
          <ul className="list-group list-group-flush" id="wd-quiz-list">
            {visibleQuizzes.length === 0 ? (
              <li className="list-group-item text-muted ps-4">
                No quizzes yet.{isFaculty && " Click + Quiz to add one."}
              </li>
            ) : (
              visibleQuizzes.map(quiz => {
                const avail = getAvailability(quiz);
                const due = formatDate(quiz.dueDate);
                return (
                  <li key={quiz._id}
                    className="list-group-item d-flex align-items-center p-3"
                    id={`wd-quiz-list-item-${quiz._id}`}>

                    {/* Green left border */}
                    <div className="align-self-stretch me-3"
                      style={{ width: 5, backgroundColor: "#198754", borderRadius: 3, minHeight: 40 }} />

                    {/* Rocket icon */}
                    <FaRocket className="text-success me-3 fs-5" style={{ minWidth: 20 }} />

                    {/* Info */}
                    <div className="flex-fill" style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/details`)}>
                      <div className="fw-bold mb-1">{quiz.title}</div>
                      <div className="text-muted small">
                        <span>{avail.label}</span>
                        {due && <span> &nbsp;|&nbsp; <strong>Due</strong> {due}</span>}
                        <span> &nbsp;|&nbsp; {quiz.points} pts</span>
                        <span> &nbsp;|&nbsp; {quiz.questions.length} Questions</span>
                      </div>
                    </div>

                    {/* Right side icons */}
                    {isFaculty && (
                      <div className="d-flex align-items-center gap-3">
                        {quiz.published
                          ? <BsCheckCircleFill className="text-success fs-5" />
                          : <BsSlashCircle className="text-secondary fs-5" />}
                        <Dropdown align="end">
                          <Dropdown.Toggle variant="link" className="text-dark p-0 border-0"
                            id={`wd-quiz-menu-${quiz._id}`}>
                            <BsThreeDotsVertical />
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
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
}