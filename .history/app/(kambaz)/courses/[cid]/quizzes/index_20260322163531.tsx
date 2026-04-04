"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";
import { BsSlashCircle } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { RootState } from "@/app/(kambaz)/store";
import { setQuizzes, deleteQuiz, togglePublish, addQuiz } from "./reducer";
import * as client from "./client";
import { Quiz } from "./types";

function getAvailability(quiz: Quiz): string {
  const now = new Date();
  const avail = new Date(quiz.availableDate);
  const until = new Date(quiz.untilDate);
  if (now > until) return "Closed";
  if (now >= avail) return "Available";
  return `Not available until ${avail.toLocaleDateString()}`;
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
    title: "New Quiz",
    course: cid,
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    points: 0,
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    questions: [],
  });
  dispatch(addQuiz(newQuiz));
  router.push(`/courses/${cid}/quizzes/${newQuiz._id}/details`);
}
  if (loading) return <div className="p-4">Loading quizzes...</div>;

  return (
    <div id="wd-quizzes" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-25" placeholder="Search for Quiz" />
        {isFaculty && (
          <button className="btn btn-danger" onClick={handleAdd}>
            + Quiz
          </button>
        )}
      </div>

      {visibleQuizzes.length === 0 ? (
        <p className="text-muted">
          No quizzes yet.{isFaculty && " Click + Quiz to add one."}
        </p>
      ) : (
        <ul className="list-group rounded-0">
          {visibleQuizzes.map(quiz => (
            <li key={quiz._id}
              className="list-group-item d-flex align-items-center justify-content-between p-3">
              <div className="me-3 align-self-stretch"
                style={{ width: 6, backgroundColor: "#198754", borderRadius: 3 }} />

              <div className="flex-fill">
                <div className="fw-bold" style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/details`)}>
                  {quiz.title}
                </div>
                <div className="text-muted small mt-1">
                  <span className="me-2"><strong>Availability: </strong>{getAvailability(quiz)}</span>
                  {quiz.dueDate && (
                    <span className="me-2">
                      <strong>Due: </strong>{new Date(quiz.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="me-2"><strong>Points: </strong>{quiz.points}</span>
                  <span><strong>Questions: </strong>{quiz.questions.length}</span>
                </div>
              </div>

              {isFaculty && (
                <div className="d-flex align-items-center gap-2">
                  <span style={{ cursor: "pointer" }} onClick={() => handleTogglePublish(quiz)}>
                    {quiz.published
                      ? <FaRocket className="text-success fs-5" />
                      : <BsSlashCircle className="text-secondary fs-5" />}
                  </span>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="text-dark p-0 border-0">
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() =>
                        router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`)}>
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
          ))}
        </ul>
      )}
    </div>
  );
}