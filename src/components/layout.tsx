import { Sidebar } from "@/components";
import cx from "classnames";
import { useSession } from "next-auth/react";

import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { data: sessionData } = useSession();

  const isUserComplete = !!sessionData?.user.role;

  const mainClasses = cx("flex grow flex-col", { "p-8": isUserComplete });

  return (
    <div className="flex h-screen w-screen">
      {isUserComplete && <Sidebar />}
      <main className={mainClasses}>{children}</main>
    </div>
  );
}
