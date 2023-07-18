import AnimatedWavesCircle from "@/components/CandidatePreview/AnimatedWavesCircle";

function ScoreGraphSection({
  fillPercentage = 0,
  size = 200,
}: {
  fillPercentage?: number;
  size?: number;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 pb-8">
        <h4 className="text-lg font-extrabold leading-tight tracking-[.24px] text-neutral-500">
          Match score
        </h4>
        <div className="relative">
          <p className="text-justify text-sm leading-normal tracking-14 text-neutral-500">
            The algorithm collects the most important skills and extracts a
            weighted average from it, given in points.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-lg bg-neutral-100 p-4">
        <p className="text-sm font-black uppercase leading-tight tracking-[2.1px] text-neutral-500">
          Score Graph:
        </p>
        <div className="relative flex items-center justify-center p-2">
          <div className="rounded-full border-2 border-brand-primary-500 bg-white">
            <AnimatedWavesCircle size={size} fillPercentage={fillPercentage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreGraphSection;
