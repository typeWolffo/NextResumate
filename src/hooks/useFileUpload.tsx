import { type TResumeAiResponse } from "@/schema/resumeAiResponse";
import { useCallback, useState } from "react";

const useFileUpload = () => {
  const [fileResponse, setFileResponse] = useState<TResumeAiResponse | null>(
    null
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const maxRetries = 3;
    let attempts = 0;
    let uploadSuccess = false;

    while (attempts < maxRetries && !uploadSuccess) {
      attempts += 1;
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error(
            `Upload failed on attempt ${attempts}:`,
            response.statusText
          );
          setUploadError(response.statusText);
          if (attempts < maxRetries) {
            console.log(`Retrying... (${attempts}/${maxRetries})`);
          }
        } else {
          console.log("Upload succeeded");
          const jsonResponse = (await response.json()) as TResumeAiResponse;
          setFileResponse(jsonResponse);
          uploadSuccess = true;
          setIsSuccess(true);
        }
      } catch (error) {
        console.error(`Upload error on attempt ${attempts}:`, error);
        setUploadError(String(error));
        if (attempts < maxRetries) {
          console.log(`Retrying... (${attempts}/${maxRetries})`);
        }
      }
      if (!uploadSuccess && attempts < maxRetries) {
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    setIsLoading(false);
  }, []);

  return {
    fileResponse,
    uploadError,
    isLoading,
    isSuccess,
    uploadFile,
  };
};

export default useFileUpload;
