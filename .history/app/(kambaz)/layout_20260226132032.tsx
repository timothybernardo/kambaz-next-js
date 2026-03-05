"use client";
import { ReactNode } from "react";
import KambazNavigation from "./navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill" style={{ marginLeft: "120px" }}>{children}</div>
      </div>
    </Provider>
  );
}