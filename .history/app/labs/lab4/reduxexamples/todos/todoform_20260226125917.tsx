"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosreducer";
import { RootState } from "../../store";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))}
              variant="success" className="float-end ms-2"
              id="wd-add-todo-click"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))}
              variant="warning" className="float-end text-white"
              id="wd-update-todo-click"> Update </Button>
      <FormControl className="w-50"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </ListGroupItem>
  );
}