import { type PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex grow p-8">{children}</main>
    </div>
  );
}
