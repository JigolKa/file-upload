import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type UseToggleProps = {
  defaultState: boolean;
};
export function useToggle(
  { defaultState }: UseToggleProps = { defaultState: false }
) {
  const [isLoading, setLoading] = useState<boolean>(defaultState);

  const toggle: () => void = () => setLoading((p) => !p);

  return [isLoading, { toggle, set: setLoading }] as const;
}

export function useIncrement() {
  const [index, setIndex] = useState(0);

  const add = (n: number) => setIndex((p) => p + n);

  return [index, { increment: () => add(1), add }] as const;
}

export function useArray<T extends unknown>(defaultState: T[]) {
  const [arr, setArr] = useState<T[]>(defaultState);

  const push = (item: T) => setArr((p) => [...p, item]);

  return [arr, { push }] as const;
}

export function useParameters<T extends string>(param: T): Record<T, string> {
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!router.query[param]) return;

    setId(router.query[param] as string);
  }, [router]);

  return { [param]: id } as Record<T, string>;
}

export function useForceUpdate() {
  const [value, setValue] = useState(0);

  return () => setValue((value) => value + 1);
}
