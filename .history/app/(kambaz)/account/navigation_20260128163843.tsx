"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      <Link
        href="/kambaz/account/signin"
        className={`list-group-item border-0 ${
          pathname?.includes("signin") ? "fw-bold text-black border-start border-3 border-black" : "text-danger"
        }`}
      >
        Signin
      </Link>
      <Link
        href="/kambaz/account/signup"
        className={`list-group-item border-0 ${
          pathname?.includes("signup") ? "fw-bold text-black border-start border-3 border-black" : "text-danger"
        }`}
      >
        Signup
      </Link>
      <Link
        href="/kambaz/account/profile"
        className={`list-group-item border-0 ${
          pathname?.includes("profile") ? "fw-bold text-black border-start border-3 border-black" : "text-danger"
        }`}
      >
        Profile
      </Link>
    </div>
  );
}