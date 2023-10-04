import { Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import { toast } from "sonner";
import { z } from "zod";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfRendererProps = { pdfFile: File | null; classNames?: string };

function PdfRenderer({ pdfFile, classNames }: PdfRendererProps) {
  const [numberOfPages, setNumberOfPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numberOfPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const { width, ref } = useResizeDetector();

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  const classes = cx(
    "shadow flex w-full flex-col items-center rounded-md bg-white",
    classNames
  );

  return (
    <div className={classes}>
      <div className="flex h-14 w-full items-center justify-between px-2">
        {numberOfPages && (
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
                setValue("page", String(currentPage - 1));
              }}
              aria-label="previous page"
            >
              <AiOutlineArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1.5">
              <Input
                {...register("page")}
                defaultValue={String(currentPage)}
                className={cx(
                  "h-8 w-12",
                  errors.page && "focus-visible:ring-red-500"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void handleSubmit(handlePageSubmit)();
                  }
                }}
              />
              <p className="space-x-1 text-sm text-zinc-700">
                <span>/</span>
                <span>{numberOfPages ?? "x"}</span>
              </p>
            </div>

            <button
              disabled={currentPage === numberOfPages}
              onClick={() => {
                setCurrentPage((prev) =>
                  prev + 1 > numberOfPages ? numberOfPages : prev + 1
                );
                setValue("page", String(currentPage + 1));
              }}
              aria-label="next page"
            >
              <AiOutlineArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="max-h-screen w-[50vw] flex-1">
        <div
          className="scrollbar scrollbar-thumb-rounded-full max-h-[calc(100vh-10rem)] overflow-scroll overflow-x-hidden"
          ref={ref}
        >
          <Document
            loading={
              <div className="flex justify-center">
                <div className="my-24 h-6 w-6 animate-spin">loading</div>
              </div>
            }
            onLoadError={() => {
              toast.error("Error loading PDF");
            }}
            onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}
            file={pdfFile}
            className="max-h-full"
          >
            <Page
              width={width ? width : 1}
              pageNumber={currentPage}
              loading={
                <div className="flex justify-center">
                  <div className="my-24 h-6 w-6 animate-spin">loading</div>
                </div>
              }
            />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfRenderer;
