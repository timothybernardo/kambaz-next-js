"use client"

import { FormControl } from "react-bootstrap";

<div id="wd-query-parameters">
  <h3>Query Parameters</h3>
  <FormControl id="wd-query-parameter-a"
         className="mb-2"
         defaultValue={a} type="number"
         onChange={(e) => setA(e.target.value)} />
  <FormControl id="wd-query-parameter-b"
         className="mb-2"
         defaultValue={b} type="number"
         onChange={(e) => setB(e.target.value)} />
  <a id="wd-query-parameter-add"
     href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
    Add {a} + {b}
  </a>
  <a id="wd-query-parameter-subtract"
     href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
    Substract {a} - {b}
  </a>
  {/* create additional links to test multiply and divide. use IDs starting with wd-query-parameter- */}
  <hr />
</div>

