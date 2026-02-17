import { FormLabel, FormControl } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      <FormLabel>Email address</FormLabel>
      <FormControl type="email" placeholder="name@example.com" />
      <FormLabel>Example textarea</FormLabel>
      <FormControl as="textarea" rows={3} />
    </div>
  );
}
