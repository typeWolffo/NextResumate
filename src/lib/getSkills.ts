import {
  type Candidate,
  type CandidateSkills,
  type Skill,
} from "@prisma/client";

type PrismaCandidateType = Candidate & {
  skills: (CandidateSkills & {
    skill: Skill;
  })[];
};

export default function getSkills(candidate: PrismaCandidateType) {
  return candidate.skills.map((skill) => skill.skill.name);
}
