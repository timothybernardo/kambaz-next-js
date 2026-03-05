mport { useState } from "react";

function TodoForm({ todo, setTodo, addTodo, updateTodo }) {
  return (
    <li className="list-group-item">
      <button
        className="btn btn-success float-end ms-2 fw-bold"
        onClick={() => addTodo(todo)}
        id="wd-add-todo-click"
      >
        Add
      </button>
      <button
        className="btn btn-warning float-end text-white fw-bold"
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-click"
      >
        Update
      </button>
      <input
        className="form-control w-50"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
    </li>
  );
}
