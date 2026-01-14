export default function Modules() {
  return (
    <div>

      {/* Implement Collapse All button, View Progress button, etc. */}
      <div className="wd-modules-toolbar">
        <button>Collapse All</button>  <button>View Progress</button> 

         <select defaultValue="VAL1">
          <option value="VAL1">Publish All</option>
          <option value="VAL2">Publish</option>
          <option value="VAL3">Unpublish</option>
        </select>

        <button>+ Module</button>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
