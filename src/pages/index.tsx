import { withSession } from "@/HOC";
import { DashboardTopbar } from "@/components";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ResuMate</title>
        <meta name="description" content="ResuMate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardTopbar />
    </>
  );
}

export const getServerSideProps = withSession();
