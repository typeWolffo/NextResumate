import { timeRangeFiters, useFiltersContext } from "@/contexts/FliterContext";
import cx from "classnames";
import { motion } from "framer-motion";

function TimeRangeFilters() {
  const { setCurrentFilter, currentFilter } = useFiltersContext();

  return (
    <div className="flex gap-2 rounded-lg bg-neutral-100 p-2">
      {timeRangeFiters.map((timeRange) => {
        const buttonClasses = cx(
          "relative z-0  px-3 py-1.5 text-sm font-medium text-black transition",
          {
            "text-white": currentFilter === timeRange,
            "hover:text-black/80": currentFilter !== timeRange,
          }
        );

        return (
          <button
            key={timeRange}
            onClick={() => setCurrentFilter(timeRange)}
            className={buttonClasses}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {currentFilter === timeRange && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 rounded-lg bg-brand-primary-500 mix-blend-overlay"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            {timeRange}
          </button>
        );
      })}
    </div>
  );
}

export default TimeRangeFilters;
