import EnvironmentVariables from "./environmentvariables";
import HttpClient from "./httpclient";
import PathParameters from "./pathparameters";
import QueryParameters from "./queryparameters";
import WorkingWithArrays from "./workingwitharrays";
import WorkingWithArraysAsynchronously from "./workingwitharraysasynchronously";
import WorkingWithObjects from "./workingwithobjects";
import WorkingWithObjectsAsynchronously from "./workingwithobjectsasynchronously";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div><hr/>
      <EnvironmentVariables/>
      <PathParameters/>
      <QueryParameters/>
      <WorkingWithObjects/>
      <WorkingWithArrays/>
      <HttpClient/>
      <WorkingWithObjectsAsynchronously/>
      <WorkingWithArraysAsynchronously/>
    </div>
);}
