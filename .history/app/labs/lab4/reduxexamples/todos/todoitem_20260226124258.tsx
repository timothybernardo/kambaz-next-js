"use client";
import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo, deleteTodo, setTodo }: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => deleteTodo(todo.id)}
              variant="danger" className="float-end ms-2"
              id="wd-delete-todo-click"> Delete </Button>
      <Button onClick={() => setTodo(todo)}
              variant="primary" className="float-end"
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}
    </ListGroupItem>
  );
}