import { PdfRenderer } from "@/components/Pdf";
import { Input } from "@/components/ui";
import { type TCandidateFormFields } from "@/schema/candidate";
import { ResumeAiResponse } from "@/schema/resumeAiResponse";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Textarea } from "../ui/Textarea/Textarea";
import { Button } from "../ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import { useManagedUIContext } from "@/contexts/ManagedUiContext";
import { toast } from "sonner";

type TResumeValidationFormProps = {
  resumeFile: File | null;
  candidateInfo: TCandidateFormFields | null;
};

function ResumeValidationForm({
  resumeFile,
  candidateInfo,
}: TResumeValidationFormProps) {
  const { register, handleSubmit, trigger } = useForm<TCandidateFormFields>({
    defaultValues: {
      university: candidateInfo?.university,
      university_degree: candidateInfo?.university_degree,
      university_start: candidateInfo?.university_start,
      university_end: candidateInfo?.university_end,
      english_level: candidateInfo?.english_level,
      github_url: candidateInfo?.github_url,
      website_url: candidateInfo?.website_url,
      name: candidateInfo?.name,
      surname: candidateInfo?.surname,
      skills: candidateInfo?.skills,
      interests: candidateInfo?.interests,
      favourite: candidateInfo?.favourite,
    },
    resolver: zodResolver(ResumeAiResponse),
  });
  const { mutate: createCandidate } =
    api.candidate.createCandidate.useMutation();
  const { closeModal } = useManagedUIContext();

  if (!candidateInfo) return <h2>Loading...</h2>;

  const handleCandidateSubmit = (data: TCandidateFormFields) => {
    createCandidate({
      ...data,
      interests: String(data.interests).split(","),
      skills: String(data.skills).split(","),
    });
  };

  const handleButtonClick = async () => {
    const isValid = await trigger();

    if (isValid) {
      await handleSubmit(handleCandidateSubmit)().then(() => {
        toast.success("Candidate created successfully");
        closeModal("file-drop-zone");
      });
    }
  };

  return (
    <div className="flex">
      <PdfRenderer pdfFile={resumeFile} />
      <div className="flex min-w-[400px] flex-col items-center">
        <div className="flex h-14 items-center gap-2">
          <AiOutlineInfoCircle className="h-5 w-5 text-brand-primary" />
          <h2 className="text-neutral-600">Check validity of information</h2>
        </div>
        <div className=" flex h-full max-h-[calc(100vh-10rem)] w-full flex-col overflow-y-auto">
          <form className="scrollbar scrollbar-thumb-rounded flex w-full flex-col gap-4 px-4 pb-2">
            <Checkbox label="Mark as favourite" {...register("favourite")} />
            <Input
              type="text"
              label="Name"
              defaultValue={candidateInfo.name}
              {...register("name")}
            />
            <Input
              type="text"
              label="Surname"
              {...register("surname")}
              defaultValue={candidateInfo.surname}
            />
            <Input
              type="text"
              label="English level"
              {...register("english_level")}
              defaultValue={candidateInfo.english_level}
            />{" "}
            <Input
              type="number"
              label="Age"
              {...register("age")}
              defaultValue={parseInt(candidateInfo.age)}
            />
            <Input
              type="text"
              label="Github"
              {...register("github_url")}
              defaultValue={candidateInfo.github_url}
            />
            <Input
              type="text"
              label="Website"
              {...register("website_url")}
              defaultValue={candidateInfo.website_url}
            />
            <Input
              type="text"
              label="City"
              {...register("city")}
              defaultValue={candidateInfo.city}
            />
            <Input
              type="text"
              label="University"
              {...register("university")}
              defaultValue={candidateInfo.university}
            />
            <Input
              type="text"
              label="Degree"
              {...register("university_degree")}
              defaultValue={candidateInfo.university_degree}
            />
            <Input
              type="text"
              label="University start"
              {...register("university_start")}
              defaultValue={candidateInfo.university_start}
            />
            <Input
              type="text"
              label="University end"
              {...register("university_end")}
              defaultValue={candidateInfo.university_end}
            />
            <Input
              type="text"
              label="Skills"
              {...register("skills")}
              defaultValue={candidateInfo.skills}
            />
            <Input
              type="text"
              label="Interests"
              {...register("interests")}
              defaultValue={candidateInfo.interests}
            />
            <Textarea
              label="Bio"
              {...register("bio")}
              defaultValue={candidateInfo.bio}
              rows={10}
            />
          </form>
          <Button
            type="button"
            onClick={handleButtonClick}
            className="my-4 px-10"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResumeValidationForm;
