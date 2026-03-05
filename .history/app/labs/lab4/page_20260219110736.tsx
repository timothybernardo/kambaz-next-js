"use client"
import ClickEvent from "./clickevent";
import PassingDataOnEvent from "./passingdataonevent";
import PassingFunctions from "./passingfunctions";
import Counter from "./counter";
import BooleanStateVariables from "./booleanstatevariables";
import StringStateVariables from "./stringstatevariables";
import DateStateVariable from "./datestatevariable";
import ObjectStateVariable from "./objectstatevariable";
import ArrayStateVariable from "./arraystatevariable";
import ParentStateComponent from "./parentstatecomponent";
import ReduxExamples from "./reduxexamples";
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
      <ReduxExamples />
      <hr />
    </div>
  );
}