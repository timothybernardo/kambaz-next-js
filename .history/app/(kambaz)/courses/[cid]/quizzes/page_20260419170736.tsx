/**
 * Quiz List route entry point for /courses/[cid]/quizzes.
 * Thin Next.js wrapper that renders the Quizzes component from index.tsx.
 * The real list logic lives in index.tsx for cleaner imports.
 */

import Quizzes from "./index";
export default function QuizzesPage() {
  return <Quizzes />;
}