"use client";

import Nav from "react-bootstrap/Nav";

export default function BootstrapNavigation() {
  return (
    <div id="wd-css-navigating-with-tabs">
      <h2>Tabs</h2>
      <Nav variant="tabs">
        <NavItem>
          <Nav.Link href="#/labs/lab2/Active">Active</Nav.Link>
        </NavItem>
        <Nav.Item>
          <Nav.Link href="#/labs/lab2/Link1">Link 1</Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link href="#/labs/lab2/Link2">Link 2</Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link href="#/labs/lab2/Disabled" disabled>Disabled</Nav.Link>
        </NavItem>
      </Nav>
    </div>
  );
}