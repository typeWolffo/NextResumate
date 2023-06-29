import { Sidebar } from "@/components";
import cx from "classnames";
import { useRouter } from "next/router";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const isLoginPage = router.asPath === "/signin";

  const mainClasses = cx("flex grow flex-col", { "p-8": !isLoginPage });

  return (
    <div className="flex h-screen w-screen">
      {!isLoginPage && <Sidebar />}
      <main className={mainClasses}>{children}</main>
    </div>
  );
}
