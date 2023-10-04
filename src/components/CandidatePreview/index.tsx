import { api } from "@/utils/api";
import { getSkills } from "src/lib";
import { useMemo } from "react";
import BioWithDetails from "./BioWithDetails";
import CandidateSkills from "./CandidateSkills";
import Header from "./Header";
import ScoreGraphSection from "./ScoreGraphSection";
import { SlideInUpAnimation } from "@/components/AnimateComponents";
import { type TCandidate } from "@/schema/candidate";

type TProps = { id: TCandidate["id"] };

function CandidatePreview({ id }: TProps) {
  const { data: candidateData } = api.candidate.getCandidateById.useQuery({
    id,
  });

  console.log(candidateData);

  const candidateSkills = useMemo(() => {
    if (candidateData) {
      return getSkills(candidateData);
    }
    return [];
  }, [candidateData]);

  if (!candidateData) return null;

  return (
    <SlideInUpAnimation className="container rounded-lg p-8 shadow-100">
      <Header
        candidateId={candidateData.candidateId}
        candidateName={{
          first: candidateData.name,
          last: candidateData.surname,
        }}
      />
      <div className="gap flex gap-14 pb-8 pt-16">
        <div className="flex flex-1 flex-col justify-between pb-8">
          <BioWithDetails
            github={candidateData.github_url}
            bio={candidateData.bio}
            city={candidateData.city}
            englishLvl={candidateData?.english_level}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between pb-8">
          <CandidateSkills skills={candidateSkills} />
        </div>

        <div className="flex flex-1 flex-col justify-between pb-8">
          {candidateData?.points && (
            <ScoreGraphSection fillPercentage={candidateData?.points} />
          )}
        </div>
      </div>
    </SlideInUpAnimation>
  );
}

export default CandidatePreview;
