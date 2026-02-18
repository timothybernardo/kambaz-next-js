"use client"
import BooleanStateVariables from "./booleanstatevariables";
import ClickEvent from "./clickevent";
import Counter from "./counter";
import PassingDataOnEvent from "./passingdataonevent";
import PassingFunctions from "./passingfunctions";
import StringStateVariables from "./stringstatevariables";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-lab4">
      <h3>Lab 4</h3>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <hr />
    </div>
  );
}
