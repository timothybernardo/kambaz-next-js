"use client";

import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Link href="/labs" passHref legacyBehavior>
          <Nav.Link>Labs</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/labs/lab1" passHref legacyBehavior>
          <Nav.Link>Lab 1</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/labs/lab2" passHref legacyBehavior>
          <Nav.Link>Lab 2</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/labs/lab3" passHref legacyBehavior>
          <Nav.Link>Lab 3</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/" passHref legacyBehavior>
          <Nav.Link>Kambaz</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi">My GitHub</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}