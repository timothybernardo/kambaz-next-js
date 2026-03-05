"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosreducer";
import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              variant="danger" className="float-end ms-2"
              id="wd-delete-todo-click"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              variant="primary" className="float-end"
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}
    </ListGroupItem>
  );
}