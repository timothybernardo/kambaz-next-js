"use client";

import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

export default function BootstrapNavigation() {
  return (
    <><div id="wd-css-navigating-with-tabs">
          <h2>Tabs</h2>
          <Nav variant="tabs">
              <Nav.Item>
                  <Nav.Link href="#/labs/lab2/Active">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="#/labs/lab2/Link1">Link 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="#/labs/lab2/Link2">Link 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="#/labs/lab2/Disabled" disabled>Disabled</Nav.Link>
              </Nav.Item>
          </Nav>
      </div><div id="wd-css-navigating-with-cards">
              <h2> Cards </h2>
              <Card style={{ width: "18rem" }}>
                  <CardImg variant="top" src="images/stacked.jpg" />
                  <CardBody>
                      <CardTitle>Stacking Starship</CardTitle>
                      <CardText>
                          Stacking the most powerful rocket in history. Mars or bust!
                      </CardText>
                      <Button variant="primary">Boldly Go</Button>
                  </CardBody>
              </Card>
          </div></>


  );
}