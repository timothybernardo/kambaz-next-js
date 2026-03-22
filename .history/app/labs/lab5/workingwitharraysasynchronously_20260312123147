import React, { useState, useEffect } from "react";
import * as client from "./client";
export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>Todos</h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <input type="checkbox" className="form-check-input me-2"
                   defaultChecked={todo.completed}/>
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title} </span>
          </ListGroupItem>
        ))}
      </ListGroup> <hr />
    </div>
);}
