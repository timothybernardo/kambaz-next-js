"use client";

import { useState } from "react";

function TodoItem({ todo, deleteTodo, setTodo }) {
  return (
    <li className="list-group-item">
      <button
        className="btn btn-danger float-end ms-2 fw-bold"
        onClick={() => deleteTodo(todo.id)}
        id="wd-delete-todo-click"
      >
        Delete
      </button>
      <button
        className="btn btn-primary float-end fw-bold"
        onClick={() => setTodo(todo)}
        id="wd-set-todo-click"
      >
        Edit
      </button>
      {todo.title}
    </li>
  );
}
