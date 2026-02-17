import { ReactNode } from "react";
import KambazNavigation from "./navigation";
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
