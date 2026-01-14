export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> 
      <br /> 
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br/>
      <table>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        Assignment Group <select defaultValue="VAL1">
        <option value="VAL1">Assignments</option>
        <option value="VAL2">
          Extra Credit
        </option>
        <option value="VAL3">Quizzes</option>
      </select>
      <br/>
       <br/>
      Display Grade as <select defaultValue="VAL1">
        <option value="VAL1">Percentage</option>
        <option value="VAL2">
          Letter Grade
        </option>
      </select>
       <br/>
        <br/>
     Submission Type <select defaultValue="VAL1">
        <option value="VAL1">Online</option>
        <option value="VAL2">
          Paper
        </option>
        <option value="VAL3">External</option>
      </select>
       <br/>
        <br/>
<label>Online Entry Options</label><br/>

<input type="checkbox" name="check-genre" id="wd-text-entry"/>
<label htmlFor="wd-text-entry">Text Entry</label><br/>

<input type="checkbox" name="check-genre" id="wd-website-url"/>
<label htmlFor="wd-website-url">Website URL</label><br/>

<input type="checkbox" name="check-genre" id="wd-media-recordings"/>
<label htmlFor="wd-media-recordings">Media Recordings</label><br/>

<input type="checkbox" name="check-genre" id="wd-student-annotation"/>
<label htmlFor="wd-student-annotation">Student Annotation</label><br />

<input type="checkbox" name="check-genre" id="wd-file-upload"/>
<label htmlFor="wd-file-upload">File Uploads</label>
<br />
<br />
<tr>
          <td align="right" valign="top">
            Assign <label htmlFor="wd-assign-to">Assign to</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue={"Everyone"} />
          </td>
        </tr>
        <br/>
        <label htmlFor="wd-due-date">Due </label>
<input type="date"
       defaultValue="2000-01-21"
       id="wd-text-fields-dob"/><br/>
      </table>
      <br/>
    </div>
  );
}
