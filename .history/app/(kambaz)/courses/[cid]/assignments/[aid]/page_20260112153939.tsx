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
        {/* Complete on your own */}
      </table>
      <br/>
      Assignment Group <select defaultValue="VAL1">
        <option value="VAL1">Assignments</option>
        <option value="VAL2" selected>
          Extra Credit
        </option>
        <option value="VAL3">Quizzes</option>
      </select>

    </div>
  );
}
