import { BasicProps } from "../types";
import { cx, merge } from "../utils";

type Props = BasicProps<"button"> & {
  isLoading?: boolean;
  loadingText?: string;
  color?: "blue" | "red" | "green";
};

export default function Button({ children, isLoading, color, ...rest }: Props) {
  const buttonStyles = `flex transition items-center justify-center rounded-md bg-${
    color || "blue"
  }-600 px-4 py-2 text-sm font-semibold text-white shadow-sm gap-2 hover:bg-${
    color || "blue"
  }-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${
    color || "blue"
  }-600 disabled:pointer-events-none`;

  return isLoading ? (
    <button
      disabled
      {...merge<"button">(
        cx(buttonStyles, `!bg-green-${color || "blue"}-400/70`),
        rest
      )}
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>{rest.loadingText}</span>
    </button>
  ) : (
    <button {...merge<"button">(buttonStyles, rest)}>{children}</button>
  );
}
