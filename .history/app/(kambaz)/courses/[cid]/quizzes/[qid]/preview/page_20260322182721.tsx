"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { LuPencil } from "react-icons/lu";
import { RootState } from "@/app/(kambaz)/store";
import { Question } from "../../types";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const quiz = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.find(q => q._id === qid)
  );

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const startedAt = new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
  });

  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const questions = quiz.questions;
  const oneAtATime = quiz.oneQuestionAtATime;
  const visibleQuestions = oneAtATime ? [questions[currentIdx]] : questions;

  const setAnswer = (questionId: string, value: any) =>
    setAnswers(a => ({ ...a, [questionId]: value }));

  const handleSubmit = () => {
    let total = 0;
    for (const q of questions) {
      const answer = answers[q._id];
      if (q.type === "Multiple Choice") {
        const correct = q.choices?.find(c => c.isCorrect);
        if (correct && answer === correct.id) total += q.points;
      } else if (q.type === "True/False") {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === "Fill in the Blank") {
        const match = q.possibleAnswers?.some((a: any) => {
          const text = typeof a === "string" ? a : a.text;
          const correct = typeof a === "string" ? true : a.isCorrect;
          return correct && text.toLowerCase() === String(answer ?? "").toLowerCase();
        });
        if (match) total += q.points;
      }
    }
    setScore(total);
    setSubmitted(true);
  };

  const isCorrect = (q: Question) => {
    const answer = answers[q._id];
    if (q.type === "Multiple Choice")
      return q.choices?.find(c => c.isCorrect)?.id === answer;
    if (q.type === "True/False")
      return answer === q.correctAnswer;
    return q.possibleAnswers?.some((a: any) => {
      const text = typeof a === "string" ? a : a.text;
      const correct = typeof a === "string" ? true : a.isCorrect;
      return correct && text.toLowerCase() === String(answer ?? "").toLowerCase();
    });
  };

  return (
    <div id="wd-quiz-preview" style={{ maxWidth: 640, margin: "0 auto", padding: "20px" }}>
      {/* Title */}
      <h4 className="fw-bold mb-2">{quiz.title}</h4>

      {/* Preview banner */}
      <div className="alert alert-danger py-2 px-3 mb-2" style={{ fontSize: 14 }}>
        ⓘ This is a preview of the published version of the quiz
      </div>

      {/* Started */}
      <div className="text-muted mb-2" style={{ fontSize: 14 }}>Started: {startedAt}</div>

      {/* Instructions */}
      <h5 className="fw-bold mb-3">Quiz Instructions</h5>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}

      {/* Score banner */}
      {submitted && (
        <div className="alert alert-info">
          <strong>Score: {score} / {quiz.points}</strong>
        </div>
      )}

      {questions.length === 0 && <p className="text-muted">No questions added yet.</p>}

      {/* Questions */}
      {visibleQuestions.map((q, idx) => {
        const globalIdx = oneAtATime ? currentIdx : idx;
        const correct = submitted ? isCorrect(q) : null;
        return (
          <div key={q._id} className="border rounded mb-3"
            style={{ borderColor: submitted ? (correct ? "#198754" : "#dc3545") : "#dee2e6" }}>
            {/* Question header */}
            <div className="d-flex justify-content-between align-items-center px-3 py-2"
              style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #dee2e6" }}>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" disabled style={{ width: 16, height: 16 }} />
                <strong>Question {globalIdx + 1}</strong>
              </div>
              <span className="text-muted">{q.points} pts</span>
            </div>

            {/* Question body */}
            <div className="p-3">
              <p>{q.question}</p>
              <hr />

              {/* Multiple Choice */}
              {q.type === "Multiple Choice" && q.choices?.map(choice => (
                <div key={choice.id} className="d-flex align-items-center gap-2 mb-2">
                  <input type="radio" name={`q-${q._id}`}
                    disabled={submitted}
                    checked={answers[q._id] === choice.id}
                    onChange={() => setAnswer(q._id, choice.id)} />
                  <span className={submitted && choice.isCorrect ? "text-success fw-bold" : ""}>
                    {choice.text}{submitted && choice.isCorrect && " ✓"}
                  </span>
                </div>
              ))}

              {/* True/False */}
              {q.type === "True/False" && [true, false].map(val => (
                <div key={String(val)} className="d-flex align-items-center gap-2 mb-2">
                  <input type="radio" name={`q-${q._id}`}
                    disabled={submitted}
                    checked={answers[q._id] === val}
                    onChange={() => setAnswer(q._id, val)} />
                  <span className={submitted && q.correctAnswer === val ? "text-success fw-bold" : ""}>
                    {val ? "True" : "False"}{submitted && q.correctAnswer === val && " ✓"}
                  </span>
                </div>
              ))}

              {/* Fill in the Blank */}
              {q.type === "Fill in the Blank" && (
                <div>
                  <input className="form-control w-50" disabled={submitted}
                    placeholder="Your answer"
                    value={answers[q._id] ?? ""}
                    onChange={e => setAnswer(q._id, e.target.value)} />
                  {submitted && (
                    <div className="text-success small mt-1">
                      Correct answers: {q.possibleAnswers
                        ?.filter((a: any) => typeof a === "string" ? true : a.isCorrect)
                        .map((a: any) => typeof a === "string" ? a : a.text)
                        .join(", ")}
                    </div>
                  )}
                </div>
              )}

              {submitted && (
                <div className={`mt-2 fw-bold ${correct ? "text-success" : "text-danger"}`}>
                  {correct ? "✓ Correct" : "✗ Incorrect"}
                </div>
              )}

              {/* Next button */}
              {oneAtATime && !submitted && (
                <div className="d-flex justify-content-end mt-3">
                  {currentIdx > 0 && (
                    <button className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => setCurrentIdx(i => i - 1)}>◀ Previous</button>
                  )}
                  {currentIdx < questions.length - 1 && (
                    <button className="btn btn-outline-secondary btn-sm"
                      onClick={() => setCurrentIdx(i => i + 1)}>Next ▶</button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Bottom bar */}
      <div className="d-flex justify-content-end align-items-center border rounded p-3 mb-3"
        style={{ backgroundColor: "#f9f9f9" }}>
        {!submitted ? (
          <>
            <span className="text-muted me-3" style={{ fontSize: 14 }}>
              Quiz saved at {startedAt}
            </span>
            {(currentIdx === questions.length - 1 || !oneAtATime) && (
              <button className="btn btn-danger" onClick={handleSubmit}>Submit Quiz</button>
            )}
          </>
        ) : (
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/details`)}>
            Back to Details
          </button>
        )}
      </div>

      {/* Keep Editing */}
      <div className="border rounded p-2 text-center">
        <span className="text-muted" style={{ cursor: "pointer", fontSize: 14 }}
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
          <LuPencil className="me-1" /> Keep Editing This Quiz
        </span>
      </div>
    </div>
  );
}