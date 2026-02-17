import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Sign up</h1>
      <input
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />
      <Link
        id="wd-signup-btn"
        href="/kambaz/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>
      <Link id="wd-signin-link" href="/kambaz/account/signin">
        Signin
      </Link>
    </div>
  );
}