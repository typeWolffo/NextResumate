import { createContext, useContext, useState, type ReactNode } from "react";
export const timeRangeFiters = [
  "Today",
  "Week",
  "Month",
  "Quarter",
  "Year",
] as const;

export type TimeRangeFitersType = (typeof timeRangeFiters)[number];

type FilterContext = {
  currentFilter: TimeRangeFitersType;
  setCurrentFilter: (category: TimeRangeFitersType) => void;
};

function createCtx<ContextType extends object | null>() {
  const ctx = createContext<ContextType | undefined>(undefined);

  function useCtx() {
    const context = useContext(ctx);
    if (context === undefined)
      throw new Error("useCtx must be inside a Provider with a value");

    return context;
  }

  return [useCtx, ctx.Provider] as const;
}

export const [useFiltersContext, FilterContextProvider] =
  createCtx<FilterContext>();

function FiltersContext({ children }: { children: ReactNode }) {
  const [currentFilter, setCurrentFilter] =
    useState<TimeRangeFitersType>("Today");

  const value = { currentFilter, setCurrentFilter };

  return (
    <FilterContextProvider value={value}>{children}</FilterContextProvider>
  );
}

export default FiltersContext;
