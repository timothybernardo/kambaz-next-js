import VariablesAndConstants from "./variablesandconstants";
import VariableTypes from "./variabletypes";
import BooleanVariables from "./booleanvariables";
import IfElse from "./ifelse";
import TernaryOperator from "./ternaryoperator";
import ConditionalOutputIfElse from "./conditionaloutputifelse";
import ConditionalOutputInline from "./conditionaloutputinline";
import LegacyFunctions from "./legacyfunctions";
import ArrowFunctions from "./arrowfunctions";
import ImpliedReturn from "./impliedreturn";
import TemplateLiterals from "./templateliterals";
import SimpleArrays from "./simplearrays";
import ArrayIndexAndLength from "./arrayindexandlength";
import AddingAndRemovingToFromArrays from "./addingandremovingtofromarrays";
import ForLoops from "./forloops";
import MapFunction from "./mapfunction";
import FindFunction from "./findfunction";
import FindIndex from "./findindex";
import FilterFunction from "./filterfunction";
import JsonStringify from "./jsonstringify";
import House from "./house";
import Spreading from "./spreader";
import Destructing from "./destructing";
import FunctionDestructing from "./functiondestructing";
import DestructingImports from "./destructingimports";
import Classes from "./classes";
import Styles from "./styles";
import ClientComponentDemo from "./clientcomponentdemo";
import ServerComponentDemo from "./servercomponentdemo";
import Add from "./add";
import Square from "./square";

export default function Lab3() {
  return (
    <div>
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals/>
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <ClientComponentDemo />
      <ServerComponentDemo />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />

    </div>
  );
}
