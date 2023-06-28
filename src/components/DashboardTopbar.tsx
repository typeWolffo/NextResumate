import TimeRangeFilters from "./TimeRangeFilters";

function DashboardTopbar() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-extrabold leading-tight text-black">
          Manage candidates
        </h2>
        <TimeRangeFilters />
      </div>
      <div className="flex gap-x-4">
        <input
          type="search"
          className="h-min w-80 rounded border border-neutral-200 p-4"
          placeholder="Search for candidates"
        />
        <button className="h-min max-w-[183px] rounded-lg border border-brand-primary-500 bg-white px-14 py-3 text-base font-extrabold leading-[175%] text-brand-primary-500 transition-colors hover:bg-brand-primary-200">
          Compare
        </button>
        <button className="h-min max-w-[183px] whitespace-nowrap rounded-lg border border-brand-primary-500 bg-brand-primary-500 px-6 py-3 text-base font-extrabold leading-[175%] text-white transition-colors hover:bg-brand-primary-600">
          Start slideshow
        </button>
      </div>
    </div>
  );
}

export default DashboardTopbar;
