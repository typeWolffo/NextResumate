import ChevronIcon from "public/icons/chevron.svg";
import GithubIcon from "public/icons/github.svg";
import LanguageIcon from "public/icons/language.svg";
import PinIcon from "public/icons/pin.svg";
import ClientSideCandidateBio from "./CandidateBio";

type Props = {
  city: string;
  englishLvl: string;
  bio: string;
  github: string;
};

function BioWithDetails({ city, englishLvl, bio, github }: Props) {
  const prepareCityName = (city: string) => {
    const cityArray = city.split(" ");

    if (cityArray.length > 1) {
      return cityArray.join("+");
    }
    return city;
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-8">
        <h4 className="text-lg font-extrabold leading-tight tracking-[.24px] text-neutral-500">
          Bio note
        </h4>
        <ClientSideCandidateBio bio={bio} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-black uppercase leading-tight tracking-[2.1px] text-neutral-400">
          Details
        </p>

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between rounded-lg bg-neutral-100 p-4 hover:bg-neutral-200"
        >
          <div className="flex gap-2">
            <GithubIcon className="text-brand-primary-500" />
            <h5 className="text-sm font-extrabold leading-normal tracking-[.12px] text-neutral-500">
              Link to Github
            </h5>
          </div>
          <ChevronIcon />
        </a>

        {city && (
          <a
            href={`https://www.google.com/maps/place/${prepareCityName(city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between rounded-lg bg-neutral-100 p-4 hover:bg-neutral-200"
          >
            <div className="flex gap-2">
              <PinIcon className="text-brand-primary-500" />
              <h5 className="text-sm font-extrabold leading-normal tracking-[.12px] text-neutral-500">
                {city}
              </h5>
            </div>
            <ChevronIcon />
          </a>
        )}

        <div className="flex justify-between rounded-lg bg-neutral-100 p-4 hover:bg-neutral-200">
          <div className="flex gap-2">
            <LanguageIcon className="text-brand-primary-500" />
            <h5 className="text-sm font-extrabold leading-normal tracking-[.12px] text-neutral-500">
              English: {englishLvl}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default BioWithDetails;
