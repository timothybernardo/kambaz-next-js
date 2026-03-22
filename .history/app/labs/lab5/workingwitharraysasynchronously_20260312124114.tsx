"use client"
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };
  const createNewTodo = async () => {
    const todos = await client.createTodo();
    setTodos(todos);
  };
  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };
   const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false, });
    setTodos([...todos, newTodo]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4> Todos <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" /> </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash onClick={() => removeTodo(todo)}
                     className="text-danger float-end mt-1" id="wd-remove-todo"/>
            <input type="checkbox" className="form-check-input me-2"
                   defaultChecked={todo.completed}/>
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title} </span>
          </ListGroupItem>
        ))}
      </ListGroup> <hr />
    </div>
  );
}