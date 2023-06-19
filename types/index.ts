import { ComponentProps } from "react";

export type BasicProps<T extends keyof JSX.IntrinsicElements = "div"> =
  ComponentProps<T>;

export type UmamiWindow = Window &
  typeof globalThis & {
    umami: { track: (msg: string) => Promise<void> };
  };
