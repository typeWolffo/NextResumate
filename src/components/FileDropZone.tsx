import cx from "classnames";
import React, { useCallback, useRef, useState } from "react";

function Dropzone() {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onDrop = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const file = Array.from(evt.dataTransfer.files)[0];
    console.log(file);
    setIsHighlighted(false);
  }, []);

  const onFileChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const file = Array.from(evt.target.files || [])[0];
      console.log(file);
    },
    []
  );

  const dropZoneClasses = cx(
    "rounded border-2 border-dashed border-neutral-300 p-6 transition-colors",
    {
      "!border-brand-primary-500 bg-brand-primary-200": isHighlighted,
    }
  );

  return (
    <div
      onClick={openFileDialog}
      className={dropZoneClasses}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      Drag and drop file here or click to upload
      <input
        type="file"
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
      />
    </div>
  );
}

export default Dropzone;
