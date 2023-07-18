import { useManagedUIContext } from "@/contexts/ManagedUiContext";
import cx from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { isServer } from "@/helpers";

function ClientSideCandidateBio({ bio }: { bio: string }) {
  const { openModal } = useManagedUIContext();
  const textRef = useRef<HTMLParagraphElement>(null);
  const [lineCount, setLineCount] = useState<number>(0);

  const calculateLineCount = useCallback(() => {
    if (textRef.current && bio && typeof window !== "undefined") {
      const lineHeightString = window
        .getComputedStyle(textRef.current)
        .getPropertyValue("line-height");
      const lineHeight = parseInt(lineHeightString, 10);
      const height = textRef.current.clientHeight;
      const lines = Math.round(height / lineHeight);
      setLineCount(lines);
    }
  }, [bio]);

  useEffect(() => {
    if (!isServer) {
      window.addEventListener("load", calculateLineCount);
    }

    calculateLineCount();

    return () => {
      if (!isServer) {
        window.removeEventListener("load", calculateLineCount);
      }
    };
  }, [calculateLineCount]);

  const bioClasses = cx("text-sm leading-normal tracking-14 text-neutral-500", {
    "line-clamp-4": lineCount >= 4,
  });

  return (
    <>
      <div className="relative">
        <p ref={textRef} className={bioClasses}>
          {bio}
        </p>
        {lineCount >= 4 && (
          <span
            role="button"
            onClick={() => openModal("candidate-bio")}
            className="text-sm text-brand-primary-500 hover:underline"
          >
            Read more
          </span>
        )}
      </div>
      <Modal id="candidate-bio">
        <p className="container rounded-lg bg-white p-8 text-md leading-normal tracking-14 text-neutral-500">
          {bio}
        </p>
      </Modal>
    </>
  );
}

export default ClientSideCandidateBio;
