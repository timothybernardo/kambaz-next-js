import { useState } from "react";
import TodoForm from "./todoform";
import TodoItem from "./todoitem";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });

  const addTodo = (todo) => {
    const newTodos = [...todos, { ...todo, id: new Date().getTime().toString() }];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = (todo) => {
    const newTodos = todos.map((item) => (item.id === todo.id ? todo : item));
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  return (
    <div id="wd-todo-list-redux" style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
      />
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}
        />
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            setTodo={setTodo}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}