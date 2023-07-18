import { env } from "@/env.mjs";
import { useMemo } from "react";
import Modal from "../Modal";
import { useManagedUIContext } from "@/contexts/ManagedUiContext";

function CandidateSkills({ skills }: { skills: string[] }) {
  const { openModal } = useManagedUIContext();

  const companyDesiredSkills = env.NEXT_PUBLIC_DESIRED_SKILLS.split(",").map(
    (skill) => skill.toLowerCase()
  );

  const desiredSkills = useMemo(
    () =>
      skills?.filter((skill) =>
        companyDesiredSkills.includes(skill.toLowerCase())
      ),
    [skills, companyDesiredSkills]
  );

  const otherSkills = useMemo(
    () =>
      skills?.filter(
        (skill) =>
          !companyDesiredSkills
            .map((skill) => skill.toLowerCase())
            .includes(skill.toLowerCase())
      ),
    [skills, companyDesiredSkills]
  );

  return (
    <>
      <div className="flex flex-col gap-4 pb-8">
        <h4 className="text-lg font-extrabold leading-tight tracking-[.24px] text-neutral-500">
          Matched skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {desiredSkills?.map((skill) => (
            <span
              className="cursor-default rounded-lg border border-brand-primary-500 px-4 py-1 text-base text-neutral-600"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-black uppercase leading-tight tracking-[2.1px] text-neutral-400">
          Other verified skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {otherSkills?.slice(0, 7).map((skill) => (
            <span
              className="cursor-default rounded-lg border border-neutral-300 px-4 py-1 text-base capitalize text-neutral-600"
              key={skill}
            >
              {skill}
            </span>
          ))}
          {otherSkills?.length > 7 && (
            <div className="w-full">
              <span
                role="button"
                onClick={() => openModal("other-skills")}
                className="transform-gpu text-sm text-brand-primary-500 hover:underline"
              >
                Show more
              </span>
            </div>
          )}
        </div>
      </div>

      <Modal id="other-skills">
        <div className="flex max-w-md flex-wrap gap-2 rounded-lg bg-white p-8">
          {otherSkills?.map((skill) => (
            <span
              className="cursor-default rounded-lg border border-neutral-300 px-4 py-1 text-base capitalize text-neutral-600"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default CandidateSkills;
