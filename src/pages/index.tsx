import FiltersContext from "@/contexts/FliterContext";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { type GetServerSidePropsContext } from "next/types";
import { DashboardTopbar } from "../components";

export default function Home() {
  return (
    <FiltersContext>
      <Head>
        <title>ResuMate</title>
        <meta name="description" content="ResuMate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardTopbar />
    </FiltersContext>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/signin" },
    };
  }

  return {
    props: { isAuthenticated: Boolean(session) },
  };
};
