import cx from "classnames";
import React, { useCallback, useRef, useState } from "react";
import { useFileUpload } from "@/hooks";
import { ResumeValidationForm } from "src/components/Pdf";

function Dropzone() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fileResponse, uploadFile } = useFileUpload();

  const handleFileUpload = async (file?: File) => {
    if (!file) {
      return;
    }
    setCurrentFile(file);

    await uploadFile(file);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onDragOver = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setIsHighlighted(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsHighlighted(false);
  }, []);

  const onDrop = useCallback(async (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const file = Array.from(evt.dataTransfer.files)[0];
    await handleFileUpload(file);
    setIsHighlighted(false);
  }, []);

  const onFileChange = useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement>) => {
      const file = Array.from(evt.target.files || [])[0];
      await handleFileUpload(file);
    },
    [],
  );

  const dropZoneClasses = cx(
    "rounded border-2 border-dashed border-neutral-300 p-6 transition-colors h-[50vh] flex items-center" +
      " justify-center text-neutral-400 text-lg leading-[175%]",
    {
      "!border-brand-primary-500 bg-brand-primary-200": isHighlighted,
    },
  );

  if (currentFile) {
    return (
      <ResumeValidationForm
        resumeFile={currentFile}
        candidateInfo={fileResponse}
      />
    );
  }
  return (
    <div
      onClick={openFileDialog}
      className={dropZoneClasses}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      onDrop={onDrop}
    >
      Drag and drop file here or click to upload
      <input
        type="file"
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
      />
    </div>
  );
}

export default Dropzone;
