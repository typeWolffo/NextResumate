import { withSession } from "@/HOC";
import { DashboardTopbar } from "@/components";
import FiltersContext from "@/contexts/FliterContext";
import ManagedUIProvider from "@/contexts/ManagedUiContext";
import Head from "next/head";

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

export const getServerSideProps = withSession();
