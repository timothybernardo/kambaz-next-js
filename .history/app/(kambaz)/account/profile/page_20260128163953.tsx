import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <input
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="form-control mb-2"
      />
      <input
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />
      <input
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="form-control mb-2"
      />
      <input
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="form-control mb-2"
      />
      <input
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="form-control mb-2"
      />
      <input
        id="wd-email"
        type="email"
        defaultValue="alice@wonderland.com"
        placeholder="Email"
        className="form-control mb-2"
      />
      <select id="wd-role" defaultValue="USER" className="form-select mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        id="wd-signout-btn"
        href="/kambaz/account/signin"
        className="btn btn-danger w-100"
      >
        Sign out
      </Link>
    </div>
  );
}