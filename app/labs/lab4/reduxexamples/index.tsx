import AddRedux from "./addredux";
import CounterRedux from "./counterredux";
import HelloRedux from "./helloredux";
import TodoList from "./todos/todolist";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux/>
      <AddRedux />
      <TodoList />
    </div>
  );
}