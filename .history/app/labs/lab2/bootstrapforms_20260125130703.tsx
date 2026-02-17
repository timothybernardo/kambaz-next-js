import { FormLabel, FormControl, FormSelect } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      <FormLabel>Email address</FormLabel>
      <FormControl type="email" placeholder="name@example.com" />
      <FormLabel>Example textarea</FormLabel>
      <FormControl as="textarea" rows={3} />
    </div>
    <div id="wd-css-styling-dropdowns">
  <h3>Dropdowns</h3>
  <FormSelect>
     <option value="0" defaultChecked>Open this select menu</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
  </FormSelect>
  </div>


  );
}
