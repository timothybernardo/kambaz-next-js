import Link from "next/link";
import MediaQueriesDemo from "./lab2/mediaqueriesdemo";
export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Timothy Bernardo</h2>
      <h2>CS4550-33211 Online</h2>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
        <li>
</li>
        <li>
       <Link href="/" id="wd-kambaz-link">Kambaz</Link> </li>
      </ul>
      <MediaQueriesDemo />
    </div>
  );
}
