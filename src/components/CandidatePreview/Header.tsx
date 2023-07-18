import { Suspense } from "react";

type Props = {
  candidateId: number;
  candidateName: { first: string; last: string };
};

function Header({ candidateId, candidateName }: Props) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex items-end justify-between border-b border-neutral-200 pb-8">
        <div className="flex gap-6">
          <div className="h-16 w-16 rounded-full bg-gray-800" />
          <div>
            <span className="text-sm">#{candidateId}</span>
            <h2 className="text-xl font-bold text-black">
              {candidateName.first} {candidateName.last}
            </h2>
          </div>
        </div>
        <div className="block">
          <div className="pb-2 text-center text-sm font-normal text-neutral-500">
            Required more information?
          </div>
          <button className="rounded-lg border border-brand-primary-500 px-11 py-2 text-base font-extrabold text-brand-primary-500 hover:border-brand-primary-600 hover:text-brand-primary-600">
            Return to HR
          </button>
        </div>
      </div>
    </Suspense>
  );
}

export default Header;
