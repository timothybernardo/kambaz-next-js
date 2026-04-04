"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { updateQuiz } from "../../reducer";
import * as client from "../../client";
import { Quiz, Question, QuestionType } from "../../types";

type Tab = "details" | "questions";

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const original = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.find(q => q._id === qid)
  );

  const [tab, setTab] = useState<Tab>("details");
  const [quiz, setQuiz] = useState<Quiz>(original ?? {} as Quiz);

  if (!original) return <div className="p-4">Quiz not found.</div>;

  const set = (field: keyof Quiz, value: any) =>
    setQuiz(q => ({ ...q, [field]: value }));

  // ── Question helpers ──────────────────────────────────
  const addQuestion = () => {
    const newQ: Question = {
      _id: Math.random().toString(36).substring(2),
      title: "New Question",
      type: "Multiple Choice",
      points: 1,
      question: "",
      choices: [
        { id: "a", text: "", isCorrect: true },
        { id: "b", text: "", isCorrect: false },
      ],
    };
    setQuiz(q => ({ ...q, questions: [...q.questions, newQ] }));
  };

  const updateQuestion = (qIdx: number, updated: Question) =>
    setQuiz(q => ({
      ...q,
      questions: q.questions.map((qu, i) => (i === qIdx ? updated : qu)),
    }));

  const deleteQuestion = (qIdx: number) =>
    setQuiz(q => ({
      ...q,
      questions: q.questions.filter((_, i) => i !== qIdx),
    }));

  // ── Save / Cancel ─────────────────────────────────────
  const handleSave = async () => {
    await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
    router.push(`/courses/${cid}/quizzes/${qid}/details`);
  };

  const handleSavePublish = async () => {
    const updated = { ...quiz, published: true };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () =>
    router.push(`/courses/${cid}/quizzes`);

  return (
    <div className="p-4" id="wd-quiz-editor">
      {/* ── Tabs ── */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}>Details</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}>Questions</button>
        </li>
      </ul>

      {/* ══ DETAILS TAB ══════════════════════════════════ */}
      {tab === "details" && (
        <div>
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input className="form-control" value={quiz.title}
              onChange={e => set("title", e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea className="form-control" rows={3} value={quiz.description}
              onChange={e => set("description", e.target.value)} />
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Quiz Type</label>
              <select className="form-select" value={quiz.quizType}
                onChange={e => set("quizType", e.target.value)}>
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Assignment Group</label>
              <select className="form-select" value={quiz.assignmentGroup}
                onChange={e => set("assignmentGroup", e.target.value)}>
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Shuffle Answers</label>
              <select className="form-select" value={quiz.shuffleAnswers ? "Yes" : "No"}
                onChange={e => set("shuffleAnswers", e.target.value === "Yes")}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Time Limit (minutes)</label>
              <input type="number" className="form-control" value={quiz.timeLimit}
                onChange={e => set("timeLimit", Number(e.target.value))} />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Multiple Attempts</label>
              <select className="form-select" value={quiz.multipleAttempts ? "Yes" : "No"}
                onChange={e => set("multipleAttempts", e.target.value === "Yes")}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            {quiz.multipleAttempts && (
              <div className="mb-3 col-md-6">
                <label className="form-label fw-bold">How Many Attempts</label>
                <input type="number" className="form-control" value={quiz.howManyAttempts}
                  onChange={e => set("howManyAttempts", Number(e.target.value))} />
              </div>
            )}

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Show Correct Answers</label>
              <select className="form-select" value={quiz.showCorrectAnswers ? "Yes" : "No"}
                onChange={e => set("showCorrectAnswers", e.target.value === "Yes")}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Access Code</label>
              <input className="form-control" value={quiz.accessCode}
                onChange={e => set("accessCode", e.target.value)} />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">One Question at a Time</label>
              <select className="form-select" value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                onChange={e => set("oneQuestionAtATime", e.target.value === "Yes")}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Webcam Required</label>
              <select className="form-select" value={quiz.webcamRequired ? "Yes" : "No"}
                onChange={e => set("webcamRequired", e.target.value === "Yes")}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Lock Questions After Answering</label>
              <select className="form-select" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                onChange={e => set("lockQuestionsAfterAnswering", e.target.value === "Yes")}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label fw-bold">Due Date</label>
              <input type="date" className="form-control" value={quiz.dueDate}
                onChange={e => set("dueDate", e.target.value)} />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label fw-bold">Available Date</label>
              <input type="date" className="form-control" value={quiz.availableDate}
                onChange={e => set("availableDate", e.target.value)} />
            </div>

            <div className="mb-3 col-md-4">
              <label className="form-label fw-bold">Until Date</label>
              <input type="date" className="form-control" value={quiz.untilDate}
                onChange={e => set("untilDate", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* ══ QUESTIONS TAB ════════════════════════════════ */}
      {tab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold">
              Total Points: {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
            </span>
            <button className="btn btn-danger" onClick={addQuestion}>
              + New Question
            </button>
          </div>

          {quiz.questions.length === 0 && (
            <p className="text-muted">No questions yet. Click + New Question to add one.</p>
          )}

          {quiz.questions.map((q, idx) => (
            <QuestionEditor key={q._id} question={q}
              onChange={updated => updateQuestion(idx, updated)}
              onDelete={() => deleteQuestion(idx)} />
          ))}
        </div>
      )}

      {/* ── Bottom Buttons ── */}
      <hr />
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-secondary" onClick={handleSave}>Save</button>
        <button className="btn btn-danger" onClick={handleSavePublish}>Save & Publish</button>
      </div>
    </div>
  );
}

// ══ Question Editor Component ═════════════════════════════
function QuestionEditor({ question, onChange, onDelete }:
  { question: Question; onChange: (q: Question) => void; onDelete: () => void }) {
  const set = (field: keyof Question, value: any) =>
    onChange({ ...question, [field]: value });

  const handleTypeChange = (type: QuestionType) => {
    const base = { ...question, type };
    if (type === "Multiple Choice") {
      onChange({ ...base, choices: [{ id: "a", text: "", isCorrect: true }, { id: "b", text: "", isCorrect: false }], correctAnswer: undefined, possibleAnswers: undefined });
    } else if (type === "True/False") {
      onChange({ ...base, correctAnswer: true, choices: undefined, possibleAnswers: undefined });
    } else {
      onChange({ ...base, possibleAnswers: [""], choices: undefined, correctAnswer: undefined });
    }
  };

  return (
    <div className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <input className="form-control w-50" placeholder="Question Title"
          value={question.title} onChange={e => set("title", e.target.value)} />
        <div className="d-flex gap-2 align-items-center">
          <select className="form-select" style={{ width: 180 }} value={question.type}
            onChange={e => handleTypeChange(e.target.value as QuestionType)}>
            <option>Multiple Choice</option>
            <option>True/False</option>
            <option>Fill in the Blank</option>
          </select>
          <input type="number" className="form-control" style={{ width: 80 }}
            value={question.points} onChange={e => set("points", Number(e.target.value))} />
          <span className="text-muted small">pts</span>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>🗑</button>
        </div>
      </div>

      <textarea className="form-control mb-3" rows={2} placeholder="Question text"
        value={question.question} onChange={e => set("question", e.target.value)} />

      {question.type === "Multiple Choice" && (
        <div>
          {question.choices?.map((choice, ci) => (
            <div key={choice.id} className="d-flex align-items-center gap-2 mb-2">
              <input type="radio" name={`correct-${question._id}`}
                checked={choice.isCorrect}
                onChange={() => onChange({
                  ...question,
                  choices: question.choices!.map((c, i) => ({ ...c, isCorrect: i === ci }))
                })} />
              <input className="form-control" placeholder={`Choice ${ci + 1}`}
                value={choice.text}
                onChange={e => onChange({
                  ...question,
                  choices: question.choices!.map((c, i) =>
                    i === ci ? { ...c, text: e.target.value } : c)
                })} />
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => onChange({
                  ...question,
                  choices: question.choices!.filter((_, i) => i !== ci)
                })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-outline-primary mt-1"
            onClick={() => onChange({
              ...question,
              choices: [...(question.choices ?? []),
                { id: Math.random().toString(36).substring(2), text: "", isCorrect: false }]
            })}>+ Add Choice</button>
        </div>
      )}

      {question.type === "True/False" && (
        <div className="d-flex gap-3">
          {[true, false].map(val => (
            <label key={String(val)} className="d-flex align-items-center gap-1">
              <input type="radio" name={`tf-${question._id}`}
                checked={question.correctAnswer === val}
                onChange={() => set("correctAnswer", val)} />
              {val ? "True" : "False"}
            </label>
          ))}
        </div>
      )}

      {question.type === "Fill in the Blank" && (
        <div>
          {question.possibleAnswers?.map((ans, ai) => (
            <div key={ai} className="d-flex gap-2 mb-2">
              <input className="form-control" placeholder={`Answer ${ai + 1}`} value={ans}
                onChange={e => onChange({
                  ...question,
                  possibleAnswers: question.possibleAnswers!.map((a, i) =>
                    i === ai ? e.target.value : a)
                })} />
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => onChange({
                  ...question,
                  possibleAnswers: question.possibleAnswers!.filter((_, i) => i !== ai)
                })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-outline-primary"
            onClick={() => onChange({
              ...question,
              possibleAnswers: [...(question.possibleAnswers ?? []), ""]
            })}>+ Add Answer</button>
        </div>
      )}
    </div>
  );
}