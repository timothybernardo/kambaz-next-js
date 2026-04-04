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

  const questions = quiz.questions ?? [];

  if (questions.length === 0) {
    return (
      <div id="wd-quiz-preview" style={{ maxWidth: 680, margin: "0 auto", padding: "20px" }}>
        <h4 className="fw-bold mb-0">{quiz.title}</h4>
        <p className="text-muted mt-3">No questions added yet. Add questions in the editor first.</p>
        <button className="btn btn-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
          Go to Editor
        </button>
      </div>
    );
  }

  const oneAtATime = quiz.oneQuestionAtATime;
  const visibleQuestions = (oneAtATime && !submitted) ? [questions[currentIdx]] : questions;

  const setAnswer = (qId: string, value: any) =>
    setAnswers(a => ({ ...a, [qId]: value }));

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
          const isC = typeof a === "string" ? true : a.isCorrect;
          return isC && text.toLowerCase() === String(answer ?? "").toLowerCase();
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
      const isC = typeof a === "string" ? true : a.isCorrect;
      return isC && text.toLowerCase() === String(answer ?? "").toLowerCase();
    });
  };

  return (
    <div id="wd-quiz-preview" style={{ maxWidth: 680, margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <h4 className="fw-bold mb-0">{quiz.title}</h4>
      <div className="text-muted mb-1" style={{ fontSize: 13 }}>Started: {startedAt}</div>
      <h5 className="fw-bold mb-2">Quiz Instructions</h5>
      {quiz.description && <p style={{ fontSize: 14 }}>{quiz.description}</p>}
      <hr />

      {submitted && (
        <div className="alert alert-info">
          <strong>Score: {score} / {quiz.points}</strong>
        </div>
      )}

      {/* Questions */}
      {visibleQuestions.map((q, idx) => {
        const globalIdx = oneAtATime ? currentIdx : idx;
        const correct = submitted ? isCorrect(q) : null;
        return (
          <div key={q._id} className="d-flex align-items-start mb-3">
            <div className="border rounded flex-fill"
              style={{ borderColor: submitted ? (correct ? "#198754" : "#dc3545") : "#dee2e6" }}>
              <div className="d-flex justify-content-between px-3 py-2"
                style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #dee2e6" }}>
                <strong>Question {globalIdx + 1}</strong>
                <span>{q.points} pts</span>
              </div>

              <div className="p-3">
                <p className="mb-3">{q.question}</p>

                {q.type === "Multiple Choice" && q.choices?.map((choice, ci) => (
                  <div key={choice.id}>
                    <div className="d-flex align-items-center gap-2 py-2">
                      <input type="radio" name={`q-${q._id}`}
                        disabled={submitted}
                        checked={answers[q._id] === choice.id}
                        onChange={() => setAnswer(q._id, choice.id)} />
                      <span className={submitted && choice.isCorrect ? "text-success fw-bold" : ""}>
                        {choice.text}{submitted && choice.isCorrect && " ✓"}
                      </span>
                    </div>
                    {ci < (q.choices?.length ?? 0) - 1 && <hr className="my-0" />}
                  </div>
                ))}

                {q.type === "True/False" && [true, false].map((val, vi) => (
                  <div key={String(val)}>
                    <div className="d-flex align-items-center gap-2 py-2">
                      <input type="radio" name={`q-${q._id}`}
                        disabled={submitted}
                        checked={answers[q._id] === val}
                        onChange={() => setAnswer(q._id, val)} />
                      <span className={submitted && q.correctAnswer === val ? "text-success fw-bold" : ""}>
                        {val ? "True" : "False"}{submitted && q.correctAnswer === val && " ✓"}
                      </span>
                    </div>
                    {vi === 0 && <hr className="my-0" />}
                  </div>
                ))}

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
              </div>
            </div>
          </div>
        );
      })}

      {oneAtATime && !submitted && (
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-secondary btn-sm"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(i => i - 1)}>◀ Previous</button>
          <button className="btn btn-outline-secondary btn-sm"
            disabled={currentIdx === questions.length - 1}
            onClick={() => setCurrentIdx(i => i + 1)}>Next ▶</button>
        </div>
      )}

      <div className="d-flex justify-content-end align-items-center border rounded p-3 mb-3">
        {!submitted ? (
          (currentIdx === questions.length - 1 || !oneAtATime) && (
            <button className="btn btn-danger" onClick={handleSubmit}>Submit Quiz</button>
          )
        ) : (
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/details`)}>
            Back to Details
          </button>
        )}
      </div>

      <div className="border rounded p-2 text-center" style={{ cursor: "pointer" }}
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
        <LuPencil className="me-1" />
        <span style={{ fontSize: 14 }}>Keep Editing This Quiz</span>
      </div>
    </div>
  );
}