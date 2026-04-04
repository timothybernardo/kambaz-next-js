import axios from "axios";
import { Quiz } from "./types";

const REMOTE = process.env.NEXT_PUBLIC_REMOTE_SERVER;
const BASE = `${REMOTE}/api`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getQuizzesForCourse = (cid: string) =>
  axiosWithCredentials.get(`${BASE}/courses/${cid}/quizzes`).then(r => r.data);

export const createQuiz = (cid: string, quiz: Partial<Quiz>) =>
  axiosWithCredentials.post(`${BASE}/courses/${cid}/quizzes`, quiz).then(r => r.data);

export const getQuizById = (qid: string) =>
  axiosWithCredentials.get(`${BASE}/quizzes/${qid}`).then(r => r.data);

export const updateQuiz = (quiz: Quiz) =>
  axiosWithCredentials.put(`${BASE}/quizzes/${quiz._id}`, quiz).then(r => r.data);

export const deleteQuiz = (qid: string) =>
  axiosWithCredentials.delete(`${BASE}/quizzes/${qid}`).then(r => r.data);

export const publishQuiz = (qid: string, published: boolean) =>
  axiosWithCredentials.put(`${BASE}/quizzes/${qid}/publish`, { published }).then(r => r.data);

export const submitAttempt = (qid: string, answers: Record<string, any>) =>
  axiosWithCredentials.post(`${BASE}/quizzes/${qid}/attempts`, { answers }).then(r => r.data);

export const getMyAttempts = (qid: string) =>
  axiosWithCredentials.get(`${BASE}/quizzes/${qid}/attempts/mine`).then(r => r.data);