"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosreducer";
import { RootState } from "../../store";


export default function TodoForm(
// { todo, setTodo, addTodo, updateTodo }
) {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>
      <FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </ListGroupItem>
);}
