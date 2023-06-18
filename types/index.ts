import { ComponentProps } from "react";

export type BasicProps<T extends keyof JSX.IntrinsicElements = "div"> =
  ComponentProps<T>;
