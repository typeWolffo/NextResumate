import cx from "classnames";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { data: sessionData } = useSession();

  const mainClasses = cx("flex grow flex-col", { "p-8": sessionData });

  return (
    <>
      <Head>
        <title>ResuMate</title>
      </Head>
      <div className="flex h-screen w-screen">
        <main className={mainClasses}>{children}</main>
      </div>
    </>
  );
}
