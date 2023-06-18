import { forwardRef } from "react";
import { BasicProps } from "../types";
import { merge, omit } from "../utils";
import { useToggle } from "../utils/hooks";

const Input = forwardRef<HTMLInputElement, BasicProps<"input">>(
  (props, ref) => {
    const [isPasswordVisible, { toggle: togglePasswordVisibility }] =
      useToggle();

    return props.type === "password" ? (
      <div className="relative w-full container mx-auto">
        <input
          type={isPasswordVisible ? "text" : "password"}
          ref={ref}
          {...merge<"input">(
            "block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            omit(props, "type")
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              onClick={togglePasswordVisibility}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              onClick={togglePasswordVisibility}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
      </div>
    ) : (
      <input
        ref={ref}
        {...merge<"input">(
          "dark:border-white dark:bg-slate-200 block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          props
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

export function InputError({ children, ...rest }: BasicProps<"p">) {
  return <p {...merge<"p">("text-sm text-red-600 mt-1", rest)}>{children}</p>;
}

export const InputLabel = forwardRef<HTMLLabelElement, BasicProps<"label">>(
  (props, ref) => (
    <label
      ref={ref}
      {...merge<"label">(
        "block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200",
        props
      )}
    >
      {props.children}
    </label>
  )
);

InputLabel.displayName = "Label";

export const TextArea = forwardRef<HTMLTextAreaElement, BasicProps<"textarea">>(
  (props, ref) => (
    <textarea
      ref={ref}
      rows={3}
      {...merge<"textarea">(
        "block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        props
      )}
    />
  )
);

TextArea.displayName = "TextArea";
