import { DashboardTopbar } from "@/components";
import FiltersContext from "@/contexts/FliterContext";
import ManagedUIProvider from "@/contexts/ManagedUiContext";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { type GetServerSidePropsContext } from "next/types";

export default function Home() {
  return (
    <ManagedUIProvider>
      <FiltersContext>
        <Head>
          <title>ResuMate</title>
          <meta name="description" content="ResuMate" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DashboardTopbar />
      </FiltersContext>
    </ManagedUIProvider>
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
