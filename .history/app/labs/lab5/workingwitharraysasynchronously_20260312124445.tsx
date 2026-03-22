"use client"
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";
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
  const deleteTodo = async (todo: any) => {
    await client.deleteTodo(todo);
    const newTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4> Todos <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" /> <FaPlusCircle onClick={postNewTodo}   className="text-primary float-end fs-3 me-3" id="wd-post-todo"   />
 </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash onClick={() => removeTodo(todo)}
                     className="text-danger float-end mt-1" id="wd-remove-todo"/>
                      <TiDelete onClick={() => deleteTodo(todo)} className="text-danger float-end me-2 fs-3" id="wd-delete-todo" />

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