"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/kambaz/account/signin", label: "Signin" },
    { href: "/kambaz/account/signup", label: "Signup" },
    { href: "/kambaz/account/profile", label: "Profile" },
  ];

  return (
    <div id="wd-account-navigation" className="wd-list-group-item list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item border-0 ${
            pathname === link.href ? "active text-black" : "text-danger"
          }`}
          style={pathname === link.href ? { borderLeft: "3px solid black" } : {}}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}