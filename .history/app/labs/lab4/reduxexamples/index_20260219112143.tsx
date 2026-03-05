import AddRedux from "./addredux";
import CounterRedux from "./counterredux";
import HelloRedux from "./helloredux";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux/>
      <AddRedux />
    </div>
  );
}