"use client"
import ArrayStateVariable from "./arraystatevariable";
import BooleanStateVariables from "./booleanstatevariables";
import ClickEvent from "./clickevent";
import Counter from "./counter";
import DateStateVariable from "./datestatevariable";
import ObjectStateVariable from "./objectstatevariable";
import ParentStateComponent from "./parentstatecomponent";
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
      <DateStateVariable/>
      <ObjectStateVariable />
      <ArrayStateVariable/>
      <ParentStateComponent />
      <hr />
    </div>
  );
}