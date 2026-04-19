/**
 * TypeScript types for the entire quizzes feature.
 * Defines Quiz, Question, Choice, and StudentAttempt, plus the string
 * unions QuizType, AssignmentGroup, and QuestionType.
 * Question uses optional fields (choices?, correctAnswer?, possibleAnswers?)
 * so one interface covers all three question types.
 */

export type QuizType = "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
export type AssignmentGroup = "Quizzes" | "Exams" | "Assignments" | "Project";
export type QuestionType = "Multiple Choice" | "True/False" | "Fill in the Blank";

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  title: string;
  type: QuestionType;
  points: number;
  question: string;
  choices?: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description: string;
  quizType: QuizType;
  assignmentGroup: AssignmentGroup;
  points: number;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  questions: Question[];
}

export interface StudentAttempt {
  _id: string;
  quiz: string;
  student: string;
  answers: Record<string, any>;
  score: number;
  submittedAt: string;
}