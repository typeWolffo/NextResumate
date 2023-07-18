import { withSession } from "@/HOC";
import { CandidatePreview } from "@/components";
import Head from "next/head";
import { useRouter } from "next/router";

function CandidatePage() {
  const { query } = useRouter();

  if (!query.id) {
    return null;
  }

  return (
    <>
      <Head>
        <title>ResuMate | Candidate #{query.id}</title>
        <meta
          property="og:title"
          content={`Candidate ${query.id.toString()}`}
          key="title"
        />
      </Head>
      <CandidatePreview id={Number(query.id)} />
    </>
  );
}

export default CandidatePage;

export const getServerSideProps = withSession();
