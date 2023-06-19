import { BasicProps } from "@/types";
import { merge } from "@/utils";

export default function Card(props: BasicProps) {
  return (
    <div
      {...merge(
        "group bg-white rounded border-2 border-blue-900 dark:bg-slate-200 dark:border-blue-500 md:px-4 md:p-2 px-2 p-1",
        props
      )}
    >
      {props.children}
    </div>
  );
}
