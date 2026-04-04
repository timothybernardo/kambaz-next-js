"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, FormGroup, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { BsSlashCircle } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
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

  const addQuestion = () => {
    const newQ: Question = {
      _id: Math.random().toString(36).substring(2),
      title: "New Question", type: "Multiple Choice",
      points: 1, question: "",
      choices: [
        { id: "a", text: "", isCorrect: true },
        { id: "b", text: "", isCorrect: false },
      ],
    };
    setQuiz(q => ({ ...q, questions: [...q.questions, newQ] }));
  };

  const updateQuestion = (idx: number, updated: Question) =>
    setQuiz(q => ({ ...q, questions: q.questions.map((qu, i) => i === idx ? updated : qu) }));

  const deleteQuestion = (idx: number) =>
    setQuiz(q => ({ ...q, questions: q.questions.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    const points = quiz.questions.reduce((s, q) => s + q.points, 0);
    const updated = { ...quiz, points };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}/details`);
  };

  const handleSavePublish = async () => {
    const points = quiz.questions.reduce((s, q) => s + q.points, 0);
    const updated = { ...quiz, points, published: true };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);

  const totalPoints = quiz.questions?.reduce((s, q) => s + q.points, 0) ?? 0;

  return (
    <div id="wd-quiz-editor">
      {/* ── Top Bar ── */}
      <div className="d-flex justify-content-end align-items-center p-3 border-bottom gap-3">
        <span className="text-muted">Points {totalPoints}</span>
        {quiz.published
          ? <span className="d-flex align-items-center gap-1 text-white bg-success px-3 py-1 rounded">
              <FaCheckCircle /> Published
            </span>
          : <span className="d-flex align-items-center gap-1 text-muted">
              <BsSlashCircle /> Not Published
            </span>
        }
        <span className="text-muted fs-4">⋮</span>
      </div>

      {/* ── Tabs ── */}
      <ul className="nav nav-tabs px-3 pt-2 sticky-top bg-white" style={{ top: 0, zIndex: 10 }}>
        <li className="nav-item">
          <button className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}>Details</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}>Questions</button>
        </li>
      </ul>

      <div className="p-4">
        {/* ══ DETAILS TAB ══ */}
        {tab === "details" && (
          <div>
            {/* Title */}
            <FormControl className="mb-4 fs-5" placeholder="Unnamed Quiz"
              value={quiz.title} onChange={e => set("title", e.target.value)} />

            {/* Description */}
            <FormGroup className="mb-4">
              <FormLabel className="fw-bold">Quiz Instructions:</FormLabel>
              <FormControl as="textarea" rows={4} value={quiz.description}
                onChange={e => set("description", e.target.value)} />
            </FormGroup>

            {/* Quiz Type + Assignment Group */}
            <Row className="mb-4">
              <Col sm={6}>
                <FormGroup as={Row} className="align-items-center mb-3">
                  <FormLabel column sm={4} className="text-end">Quiz Type</FormLabel>
                  <Col sm={8}>
                    <FormSelect value={quiz.quizType} onChange={e => set("quizType", e.target.value)}>
                      <option>Graded Quiz</option>
                      <option>Practice Quiz</option>
                      <option>Graded Survey</option>
                      <option>Ungraded Survey</option>
                    </FormSelect>
                  </Col>
                </FormGroup>
                <FormGroup as={Row} className="align-items-center">
                  <FormLabel column sm={4} className="text-end">Assignment Group</FormLabel>
                  <Col sm={8}>
                    <FormSelect value={quiz.assignmentGroup} onChange={e => set("assignmentGroup", e.target.value)}>
                      <option>Quizzes</option>
                      <option>Exams</option>
                      <option>Assignments</option>
                      <option>Project</option>
                    </FormSelect>
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            {/* Options */}
            <div className="mb-4">
              <strong>Options</strong>
              <div className="mt-2">
                <FormCheck className="mb-2" id="wd-shuffle"
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={e => set("shuffleAnswers", e.target.checked)} />
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FormCheck id="wd-time-limit"
                    label="Time Limit"
                    checked={quiz.timeLimit > 0}
                    onChange={e => set("timeLimit", e.target.checked ? 20 : 0)} />
                  {quiz.timeLimit > 0 && (
                    <>
                      <FormControl type="number" style={{ width: 80 }} value={quiz.timeLimit}
                        onChange={e => set("timeLimit", Number(e.target.value))} />
                      <span>Minutes</span>
                    </>
                  )}
                </div>
              </div>

              {/* Multiple Attempts */}
              <div className="border rounded p-3 mb-2">
                <FormCheck id="wd-attempts" className="mb-2"
                  label="Allow Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={e => set("multipleAttempts", e.target.checked)} />
              </div>

              {/* Show Correct Answers */}
              <div className="border rounded p-3 mb-2">
                <FormCheck id="wd-show-answers"
                  label="Let Students See Their Quiz Responses"
                  checked={quiz.showCorrectAnswers}
                  onChange={e => set("showCorrectAnswers", e.target.checked)} />
              </div>

              {/* One at a time */}
              <div className="border rounded p-3 mb-2">
                <FormCheck id="wd-one-question"
                  label="Show one question at a time"
                  checked={quiz.oneQuestionAtATime}
                  onChange={e => set("oneQuestionAtATime", e.target.checked)} />
              </div>

              {/* Quiz Restrictions */}
              <div className="mt-3 mb-2">
                <strong>Quiz Restrictions</strong>
                <div className="border rounded p-3 mt-2">
                  <FormCheck id="wd-access-code" className="mb-2"
                    label="Require an access code"
                    checked={!!quiz.accessCode}
                    onChange={e => set("accessCode", e.target.checked ? "pass" : "")} />
                  {quiz.accessCode && (
                    <FormControl className="mt-2" placeholder="Access Code"
                      value={quiz.accessCode}
                      onChange={e => set("accessCode", e.target.value)} />
                  )}
                  <FormCheck id="wd-webcam"
                    label="Require webcam"
                    checked={quiz.webcamRequired}
                    onChange={e => set("webcamRequired", e.target.checked)} />
                </div>
              </div>
            </div>

            {/* Assign / Dates */}
            <FormGroup as={Row} className="mb-4">
              <FormLabel column sm={2} className="text-end">Assign</FormLabel>
              <Col sm={8}>
                <div className="border rounded p-3">
                  <FormLabel className="fw-bold">Assign to</FormLabel>
                  <FormControl className="mb-3" defaultValue="Everyone" disabled />

                  <FormLabel className="fw-bold">Due</FormLabel>
                  <FormControl type="date" className="mb-3"
                    value={quiz.dueDate} onChange={e => set("dueDate", e.target.value)} />

                  <Row>
                    <Col sm={6}>
                      <FormLabel className="fw-bold">Available from</FormLabel>
                      <FormControl type="date"
                        value={quiz.availableDate} onChange={e => set("availableDate", e.target.value)} />
                    </Col>
                    <Col sm={6}>
                      <FormLabel className="fw-bold">Until</FormLabel>
                      <FormControl type="date"
                        value={quiz.untilDate} onChange={e => set("untilDate", e.target.value)} />
                    </Col>
                  </Row>
                </div>
              </Col>
            </FormGroup>
          </div>
        )}

        {/* ══ QUESTIONS TAB ══ */}
        {tab === "questions" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Total Points: {totalPoints}</span>
              <button className="btn btn-danger" onClick={addQuestion}>+ New Question</button>
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
      </div>

      {/* ── Bottom Buttons ── */}
      <hr />
      <div className="d-flex justify-content-end gap-2 px-4 pb-4">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-secondary" onClick={handleSave}>Save</button>
        <button className="btn btn-danger" onClick={handleSavePublish}>Save & Publish</button>
      </div>
    </div>
  );
}

function QuestionEditor({ question, onChange, onDelete }:
  { question: Question; onChange: (q: Question) => void; onDelete: () => void }) {
  const set = (field: keyof Question, value: any) =>
    onChange({ ...question, [field]: value });

  const handleTypeChange = (type: QuestionType) => {
    const base = { ...question, type };
    if (type === "Multiple Choice")
      onChange({ ...base, choices: [{ id: "a", text: "", isCorrect: true }, { id: "b", text: "", isCorrect: false }], correctAnswer: undefined, possibleAnswers: undefined });
    else if (type === "True/False")
      onChange({ ...base, correctAnswer: true, choices: undefined, possibleAnswers: undefined });
    else
      onChange({ ...base, possibleAnswers: [""], choices: undefined, correctAnswer: undefined });
  };

  return (
    <div className="border rounded p-3 mb-3">
      <Row className="mb-3 align-items-center">
        <Col sm={5}>
          <FormControl placeholder="Question Title" value={question.title}
            onChange={e => set("title", e.target.value)} />
        </Col>
        <Col sm={3}>
          <FormSelect value={question.type}
            onChange={e => handleTypeChange(e.target.value as QuestionType)}>
            <option>Multiple Choice</option>
            <option>True/False</option>
            <option>Fill in the Blank</option>
          </FormSelect>
        </Col>
        <Col sm={2}>
          <div className="d-flex align-items-center gap-1">
            <FormControl type="number" value={question.points}
              onChange={e => set("points", Number(e.target.value))} />
            <span className="text-muted small">pts</span>
          </div>
        </Col>
        <Col sm={2} className="text-end">
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>Delete</button>
        </Col>
      </Row>

      <FormGroup className="mb-3">
        <FormLabel className="fw-bold">Question</FormLabel>
        <FormControl as="textarea" rows={2} placeholder="Enter question text"
          value={question.question} onChange={e => set("question", e.target.value)} />
      </FormGroup>

      {question.type === "Multiple Choice" && (
        <div>
          <FormLabel className="fw-bold">Choices</FormLabel>
          {question.choices?.map((choice, ci) => (
            <div key={choice.id} className="d-flex align-items-center gap-2 mb-2">
              <input type="radio" name={`correct-${question._id}`}
                checked={choice.isCorrect}
                onChange={() => onChange({
                  ...question,
                  choices: question.choices!.map((c, i) => ({ ...c, isCorrect: i === ci }))
                })} />
              <FormControl placeholder={`Choice ${ci + 1}`} value={choice.text}
                onChange={e => onChange({
                  ...question,
                  choices: question.choices!.map((c, i) => i === ci ? { ...c, text: e.target.value } : c)
                })} />
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => onChange({ ...question, choices: question.choices!.filter((_, i) => i !== ci) })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-outline-primary mt-1"
            onClick={() => onChange({
              ...question,
              choices: [...(question.choices ?? []), { id: Math.random().toString(36).substring(2), text: "", isCorrect: false }]
            })}>+ Add Choice</button>
        </div>
      )}

      {question.type === "True/False" && (
        <div>
          <FormLabel className="fw-bold">Correct Answer</FormLabel>
          <div className="d-flex gap-3">
            {[true, false].map(val => (
              <label key={String(val)} className="d-flex align-items-center gap-2">
                <input type="radio" name={`tf-${question._id}`}
                  checked={question.correctAnswer === val}
                  onChange={() => set("correctAnswer", val)} />
                {val ? "True" : "False"}
              </label>
            ))}
          </div>
        </div>
      )}

      {question.type === "Fill in the Blank" && (
        <div>
          <FormLabel className="fw-bold">Possible Correct Answers</FormLabel>
          {question.possibleAnswers?.map((ans, ai) => (
            <div key={ai} className="d-flex gap-2 mb-2">
              <FormControl placeholder={`Answer ${ai + 1}`} value={ans}
                onChange={e => onChange({
                  ...question,
                  possibleAnswers: question.possibleAnswers!.map((a, i) => i === ai ? e.target.value : a)
                })} />
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => onChange({ ...question, possibleAnswers: question.possibleAnswers!.filter((_, i) => i !== ai) })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-outline-primary"
            onClick={() => onChange({ ...question, possibleAnswers: [...(question.possibleAnswers ?? []), ""] })}>+ Add Answer</button>
        </div>
      )}
    </div>
  );
}