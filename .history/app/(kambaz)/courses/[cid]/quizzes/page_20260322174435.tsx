"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, FormGroup, FormLabel, FormSelect, Row, Col } from "react-bootstrap";
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
    setQuiz(q => ({ ...q, questions: q.questions.map((qu, i) => i === qIdx ? updated : qu) }));

  const deleteQuestion = (qIdx: number) =>
    setQuiz(q => ({ ...q, questions: q.questions.filter((_, i) => i !== qIdx) }));

  const handleSave = async () => {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const updated = { ...quiz, points: totalPoints };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}/details`);
  };

  const handleSavePublish = async () => {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const updated = { ...quiz, points: totalPoints, published: true };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);

  return (
    <div id="wd-quiz-editor" className="p-3">
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
          {/* Title */}
          <FormGroup className="mb-3">
            <FormLabel htmlFor="wd-title">Title</FormLabel>
            <FormControl id="wd-title" value={quiz.title}
              onChange={e => set("title", e.target.value)} />
          </FormGroup>

          {/* Description */}
          <FormGroup className="mb-3">
            <FormLabel htmlFor="wd-description">Description</FormLabel>
            <FormControl as="textarea" id="wd-description" rows={4}
              value={quiz.description}
              onChange={e => set("description", e.target.value)} />
          </FormGroup>

          {/* Quiz Type */}
          <FormGroup as={Row} className="mb-3">
            <FormLabel column sm={3} className="text-end" htmlFor="wd-quiz-type">Quiz Type</FormLabel>
            <Col sm={9}>
              <FormSelect id="wd-quiz-type" value={quiz.quizType}
                onChange={e => set("quizType", e.target.value)}>
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </FormSelect>
            </Col>
          </FormGroup>

          {/* Assignment Group */}
          <FormGroup as={Row} className="mb-3">
            <FormLabel column sm={3} className="text-end" htmlFor="wd-assignment-group">Assignment Group</FormLabel>
            <Col sm={9}>
              <FormSelect id="wd-assignment-group" value={quiz.assignmentGroup}
                onChange={e => set("assignmentGroup", e.target.value)}>
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </FormSelect>
            </Col>
          </FormGroup>

          {/* Options */}
          <FormGroup as={Row} className="mb-3">
            <FormLabel column sm={3} className="text-end">Options</FormLabel>
            <Col sm={9}>
              <div className="border rounded p-3">
                <Row className="mb-3">
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-shuffle" className="fw-bold">Shuffle Answers</FormLabel>
                    <FormSelect id="wd-shuffle" value={quiz.shuffleAnswers ? "Yes" : "No"}
                      onChange={e => set("shuffleAnswers", e.target.value === "Yes")}>
                      <option>Yes</option>
                      <option>No</option>
                    </FormSelect>
                  </Col>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-time-limit" className="fw-bold">Time Limit (min)</FormLabel>
                    <FormControl id="wd-time-limit" type="number" value={quiz.timeLimit}
                      onChange={e => set("timeLimit", Number(e.target.value))} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-attempts" className="fw-bold">Multiple Attempts</FormLabel>
                    <FormSelect id="wd-attempts" value={quiz.multipleAttempts ? "Yes" : "No"}
                      onChange={e => set("multipleAttempts", e.target.value === "Yes")}>
                      <option>No</option>
                      <option>Yes</option>
                    </FormSelect>
                  </Col>
                  {quiz.multipleAttempts && (
                    <Col sm={6}>
                      <FormLabel htmlFor="wd-how-many" className="fw-bold">How Many Attempts</FormLabel>
                      <FormControl id="wd-how-many" type="number" value={quiz.howManyAttempts}
                        onChange={e => set("howManyAttempts", Number(e.target.value))} />
                    </Col>
                  )}
                </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-show-answers" className="fw-bold">Show Correct Answers</FormLabel>
                    <FormSelect id="wd-show-answers" value={quiz.showCorrectAnswers ? "Yes" : "No"}
                      onChange={e => set("showCorrectAnswers", e.target.value === "Yes")}>
                      <option>No</option>
                      <option>Yes</option>
                    </FormSelect>
                  </Col>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-access-code" className="fw-bold">Access Code</FormLabel>
                    <FormControl id="wd-access-code" value={quiz.accessCode}
                      onChange={e => set("accessCode", e.target.value)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-one-question" className="fw-bold">One Question at a Time</FormLabel>
                    <FormSelect id="wd-one-question" value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                      onChange={e => set("oneQuestionAtATime", e.target.value === "Yes")}>
                      <option>Yes</option>
                      <option>No</option>
                    </FormSelect>
                  </Col>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-webcam" className="fw-bold">Webcam Required</FormLabel>
                    <FormSelect id="wd-webcam" value={quiz.webcamRequired ? "Yes" : "No"}
                      onChange={e => set("webcamRequired", e.target.value === "Yes")}>
                      <option>No</option>
                      <option>Yes</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-lock" className="fw-bold">Lock Questions After Answering</FormLabel>
                    <FormSelect id="wd-lock" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                      onChange={e => set("lockQuestionsAfterAnswering", e.target.value === "Yes")}>
                      <option>No</option>
                      <option>Yes</option>
                    </FormSelect>
                  </Col>
                </Row>
              </div>
            </Col>
          </FormGroup>

          {/* Dates */}
          <FormGroup as={Row} className="mb-3">
            <FormLabel column sm={3} className="text-end">Assign</FormLabel>
            <Col sm={9}>
              <div className="border rounded p-3">
                <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
                <FormControl id="wd-due-date" type="date" className="mb-3"
                  value={quiz.dueDate}
                  onChange={e => set("dueDate", e.target.value)} />
                <Row>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-available-date" className="fw-bold">Available from</FormLabel>
                    <FormControl id="wd-available-date" type="date"
                      value={quiz.availableDate}
                      onChange={e => set("availableDate", e.target.value)} />
                  </Col>
                  <Col sm={6}>
                    <FormLabel htmlFor="wd-until-date" className="fw-bold">Until</FormLabel>
                    <FormControl id="wd-until-date" type="date"
                      value={quiz.untilDate}
                      onChange={e => set("untilDate", e.target.value)} />
                  </Col>
                </Row>
              </div>
            </Col>
          </FormGroup>
        </div>
      )}

      {/* ══ QUESTIONS TAB ════════════════════════════════ */}
      {tab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold">
              Total Points: {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
            </span>
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

      {/* ── Bottom Buttons ── */}
      <hr />
      <div className="d-flex justify-content-end gap-2">
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

      {/* Multiple Choice */}
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

      {/* True/False */}
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

      {/* Fill in the Blank */}
      {question.type === "Fill in the Blank" && (
        <div>
          <FormLabel className="fw-bold">Possible Correct Answers</FormLabel>
          {question.possibleAnswers?.map((ans, ai) => (
            <div key={ai} className="d-flex gap-2 mb-2">
              <FormControl placeholder={`Answer ${ai + 1}`} value={ans}
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