"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { togglePublish } from "../../reducer";

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

  return (
    <div id="wd-quiz-details" className="p-4">
      {/* ── Action Buttons ── */}
      {isFaculty && (
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
            Preview
          </button>
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
            ✏️ Edit
          </button>
          <button
            className={`btn ${quiz.published ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => dispatch(togglePublish(qid))}>
            {quiz.published ? "✅ Published" : "🚫 Unpublished"}
          </button>
        </div>
      )}

      <h2>{quiz.title}</h2>
      <hr />

      {/* ── Details Table ── */}
      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <td className="fw-bold text-end">Quiz Type</td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts})` : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Access Code</td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Lock Questions</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Due Date</td>
            <td>{quiz.dueDate || "—"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Available Date</td>
            <td>{quiz.availableDate || "—"}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Until Date</td>
            <td>{quiz.untilDate || "—"}</td>
          </tr>
        </tbody>
      </table>

      {/* ── Student: Start Quiz ── */}
      {!isFaculty && (
        <button className="btn btn-danger mt-3"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}>
          Take Quiz
        </button>
      )}
    </div>
  );
}