import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cx, fetcher, getDifference, merge, transformFileSize } from "@/utils";
import axios from "axios";
import Input, { InputError, InputLabel } from "@/components/Input";
import Button from "@/components/Button";
import { useToggle } from "@/utils/hooks";
import useSWR from "swr";
import { File as DatabaseFile } from "@prisma/client";
import Card from "@/components/Card";
import Link from "next/link";
import { BasicProps } from "@/types";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, mutate } = useSWR<
    Omit<DatabaseFile, "ipAddress" | "updatedAt">[]
  >("/api/files?recents=1", fetcher);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, { toggle }] = useToggle();
  const [filesError, setError] = useState("");

  const handleFiles = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (files && files.length) {
      setFiles((existing) => existing.concat(Array.from(files)));
    }
  };

  const handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle();

    if (!files.length) {
      setError("Choose at least one files");
      toggle();
      return;
    } else if (files.length > 10) {
      setError("Maximum 10 files at once");
      toggle();
      return;
    }

    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      if (!files[i].size) continue;

      fd.append(i.toString(), files[i]);
    }

    fd.append("uploaderName", name ? name : "Anonymous");

    try {
      axios
        .post("/api/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .finally(() => mutate());
    } catch (error) {
      console.error("🚀 ~ file: index.tsx:35 ~ handler ~ error:", error);
    }

    formRef.current?.reset();
    setName("");
    setFiles([]);
    toggle();
  };

  return (
    <main
      className={`h-full min-h-screen w-screen ${inter.className} dark:bg-slate-900`}
    >
      <div className="mx-auto max-w-7xl md:px-28 md:pt-20 px-6 pt-10 transition">
        <div>
          <h1 className="text-3xl font-bold dark:text-slate-200">
            Upload a file
          </h1>

          <form onSubmit={handler} className="mt-3 md:mt-6" ref={formRef}>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <div className="lg:w-[65%]">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col bg-white dark:border-blue-500 dark:bg-slate-200 justify-center h-56 lg:h-96 border-2 border-blue-900 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <DocumentPlusIcon
                      height={36}
                      width={36}
                      className="text-gray-600"
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-600">
                      <span className="font-semibold">Click here</span> to
                      choose some files
                    </p>
                  </div>
                  <input
                    onChange={handleFiles}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                  />
                </label>
                {filesError ? <InputError>{filesError}</InputError> : null}
              </div>

              <div className="w-full lg:w-[35%] dark:text-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Selected files</h2>
                  <div
                    className="flex items-center gap-1 font-medium cursor-pointer"
                    onClick={() => {
                      setFiles([]);
                      setError("");
                    }}
                  >
                    <XMarkIcon
                      height={20}
                      width={20}
                      strokeWidth={2}
                      className="text-red-600"
                    />
                    <span>Clear files</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 max-h-64 md:max-h-[calc(23rem-1.75rem)] pr-2 overflow-auto">
                  {files.length > 0 ? (
                    files.map((v) => (
                      <Card key={v.name}>
                        <p className="text-md max-w-fit block dark:text-slate-800 break-words">
                          {v.name}
                        </p>
                        <Detail>{transformFileSize(v.size, true, 0)}</Detail>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center mt-6">
                      <XMarkIcon
                        height={40}
                        width={40}
                        className="text-red-600"
                      />
                      <span className="font-semibold">No files selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={cx(filesError ? "mt-8" : "mt-6")}>
              <InputLabel>Enter your name</InputLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                className="mt-1"
              />
            </div>

            <div className="w-full justify-center flex mt-3 md:mt-6">
              <Button
                type="submit"
                className="w-48"
                isLoading={isLoading}
                loadingText="Loading..."
              >
                Submit
              </Button>
            </div>
          </form>

          <div className="mt-12 md:pb-20 pb-10">
            <h1 className="text-3xl font-bold dark:text-slate-200">
              Recents files
            </h1>

            <div className="mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data
                ? data.map((v) => (
                    <Card
                      key={v.id}
                      className="hover:shadow-md transition hover:bg-blue-500 hover:text-white"
                    >
                      <Link href={v.url} target="_blank">
                        <p className="text-md max-w-prose block dark:text-slate-900 break-words hover:text-white transition">
                          {v.slug}
                        </p>
                        <Detail>{transformFileSize(v.size, true, 0)}</Detail>
                        <Detail>{v.uploaderName}</Detail>
                        <Detail>
                          {getDifference(new Date(v.createdAt)) === "Now"
                            ? "Now"
                            : `${getDifference(new Date(v.createdAt))} ago`}
                        </Detail>
                      </Link>
                    </Card>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail(props: BasicProps<"p">) {
  return (
    <p
      {...merge<"p">(
        "text-gray-700 mt-1 text-sm md:text-[16px] group-hover:text-white transition dark:text-slate-700",
        props
      )}
    >
      {props.children}
    </p>
  );
}
