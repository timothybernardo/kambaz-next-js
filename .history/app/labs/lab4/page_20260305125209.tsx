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
import store from "./store";
import { Provider } from "react-redux";
import Link from "next/link";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
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
      <Link href="/labs/lab4/url-encoding/query-parameters">
        URL Encoding Examples
      </Link>
      <hr />
    </div>
    </Provider>
  );
}