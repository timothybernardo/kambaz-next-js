"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
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
    <div className="p-4" id="wd-quiz-preview">
      <div className="alert alert-warning">
        <strong>Preview Mode</strong> — This is how students will see the quiz. Answers are not saved.
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        <button className="btn btn-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
          ✏️ Edit Quiz
        </button>
      </div>

      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <p>
        <strong>Points: </strong>{quiz.points} &nbsp;
        <strong>Questions: </strong>{questions.length} &nbsp;
        <strong>Time Limit: </strong>{quiz.timeLimit} min
      </p>
      <hr />

      {submitted && (
        <div className="alert alert-info">
          <strong>Score: {score} / {quiz.points}</strong>
        </div>
      )}

      {questions.length === 0 && <p className="text-muted">No questions added yet.</p>}

      {visibleQuestions.map((q, idx) => {
        const globalIdx = oneAtATime ? currentIdx : idx;
        const correct = submitted ? isCorrect(q) : null;
        return (
          <div key={q._id}
            className={`border rounded p-3 mb-3 ${submitted ? (correct ? "border-success" : "border-danger") : ""}`}>
            <div className="d-flex justify-content-between">
              <strong>Question {globalIdx + 1}: {q.title}</strong>
              <span className="text-muted">{q.points} pts</span>
            </div>
            <p className="mt-2">{q.question}</p>

            {q.type === "Multiple Choice" && q.choices?.map(choice => (
              <div key={choice.id} className="d-flex align-items-center gap-2 mb-1">
                <input type="radio" name={`q-${q._id}`}
                  disabled={submitted}
                  checked={answers[q._id] === choice.id}
                  onChange={() => setAnswer(q._id, choice.id)} />
                <span className={submitted && choice.isCorrect ? "text-success fw-bold" : ""}>
                  {choice.text}{submitted && choice.isCorrect && " ✓"}
                </span>
              </div>
            ))}

            {q.type === "True/False" && [true, false].map(val => (
              <div key={String(val)} className="d-flex align-items-center gap-2 mb-1">
                <input type="radio" name={`q-${q._id}`}
                  disabled={submitted}
                  checked={answers[q._id] === val}
                  onChange={() => setAnswer(q._id, val)} />
                <span className={submitted && q.correctAnswer === val ? "text-success fw-bold" : ""}>
                  {val ? "True" : "False"}{submitted && q.correctAnswer === val && " ✓"}
                </span>
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
        );
      })}

      <div className="d-flex gap-2 mt-3">
        {oneAtATime && !submitted && (
          <>
            {currentIdx > 0 && (
              <button className="btn btn-secondary"
                onClick={() => setCurrentIdx(i => i - 1)}>← Previous</button>
            )}
            {currentIdx < questions.length - 1 && (
              <button className="btn btn-primary"
                onClick={() => setCurrentIdx(i => i + 1)}>Next →</button>
            )}
          </>
        )}
        {!submitted && (currentIdx === questions.length - 1 || !oneAtATime) && (
          <button className="btn btn-danger" onClick={handleSubmit}>Submit Quiz</button>
        )}
        {submitted && (
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/details`)}>
            Back to Details
          </button>
        )}
      </div>
    </div>
  );
}