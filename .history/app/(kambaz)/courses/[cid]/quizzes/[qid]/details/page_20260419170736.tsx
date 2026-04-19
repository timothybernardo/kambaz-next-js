/**
 * Quiz Details landing page shown after clicking a quiz from the list.
 * Faculty see a top action bar (Publish toggle, Preview, Edit) and the
 * full settings table. Students see the same settings plus a red
 * "Take Quiz" button at the bottom instead of the faculty toolbar.
 * Reads from Redux — no fetch here since the list already loaded the data.
 */

"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { BsSlashCircle } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { RootState } from "@/app/(kambaz)/store";
import { togglePublish } from "../../reducer";
import * as client from "../../client";

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const quiz = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.find(q => q._id === qid)
  );
  const isFaculty = currentUser?.role === "FACULTY";

  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const handleTogglePublish = async () => {
    await client.publishQuiz(qid, !quiz.published);
    dispatch(togglePublish(qid));
  };

  return (
    <div id="wd-quiz-details">
      {/* ── Top Action Bar ── */}
      {isFaculty && (
        <div className="d-flex justify-content-center align-items-center gap-2 py-3 border-bottom mb-4">
          <button
            className={`btn d-flex align-items-center gap-2 ${quiz.published ? "btn-success" : "btn-outline-secondary"}`}
            onClick={handleTogglePublish}>
            {quiz.published
              ? <><FaCheckCircle /> Published</>
              : <><BsSlashCircle /> Not Published</>}
          </button>
          <button className="btn btn-outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
            Preview
          </button>
          <button className="btn btn-outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
            <LuPencil /> Edit
          </button>
          <button className="btn btn-outline-secondary">⋮</button>
        </div>
      )}

      {/* ── Title ── */}
      <div className="px-4">
        <h2 className="fw-bold mb-4">{quiz.title}</h2>

        {/* ── Details Table ── */}
        <table className="mb-4" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <tbody>
            {[
              ["Quiz Type", quiz.quizType],
              ["Points", quiz.points],
              ["Assignment Group", quiz.assignmentGroup],
              ["Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No"],
              ["Time Limit", quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Time Limit"],
              ["Multiple Attempts", quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts})` : "No"],
              ["View Responses", quiz.showCorrectAnswers ? "Yes" : "No"],
              ["One Question at a Time", quiz.oneQuestionAtATime ? "Yes" : "No"],
              ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
              ["Lock Questions After Answering", quiz.lockQuestionsAfterAnswering ? "Yes" : "No"],
              ["Access Code", quiz.accessCode || "None"],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="fw-bold text-end pe-4" style={{ whiteSpace: "nowrap" }}>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Dates Table ── */}
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.dueDate)}</td>
              <td>Everyone</td>
              <td>{formatDate(quiz.availableDate)}</td>
              <td>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </table>

        {/* ── Student: Take Quiz ── */}
        {!isFaculty && (
          <button className="btn btn-danger mt-3"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}>
            Take Quiz
          </button>
        )}
      </div>
    </div>
  );
}