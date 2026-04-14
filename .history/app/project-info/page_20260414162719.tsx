export default function ProjectInfo() {
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Kambaz Quizzes — Project Info</h1>
      <hr />

      <h2>Team</h2>
      <p><strong>Timothy Bernardo</strong></p>

      <h2>Repositories</h2>
      <p>
        <strong>Frontend:</strong>{" "}
        <a href="https://github.com/timothybernardo/kambaz-next-js/tree/quizzes" target="_blank">
          kambaz-next-js (quizzes branch)
        </a>
      </p>
      <p>
        <strong>Server:</strong>{" "}
        <a href="https://github.com/timothybernardo/kambaz-node-server-app/tree/quizzes" target="_blank">
          kambaz-node-server-app (quizzes branch)
        </a>
      </p>

      <hr />
      <a href="/kambaz/account/signin">Go to Kambaz →</a>
    </div>
  );
}