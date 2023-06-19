import { NextApiRequest } from "next";
import os from "os";
import { JSXElementConstructor } from "react";
import { toast } from "react-hot-toast";

export function getPath(name: string) {
  const isWin = process.platform === "win32";

  return `${os.tmpdir()}${isWin ? "\\" : "/"}${name}`;
}

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function transformFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export const retrieveIP = (req: NextApiRequest): string | undefined =>
  (req.headers["x-forwarded-for"] as string) || req.connection.remoteAddress;

export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  const keysToRemove = new Set<keyof T>(keys.flat() as typeof keys);

  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keysToRemove.has(k as K))
  ) as Omit<T, K>;
}

export function pick<T extends object, K extends keyof T>(
  object: T,
  ...keys: K[]
) {
  return keys.reduce(
    (result, key) =>
      key in object ? { ...result, [key]: object[key] } : result,
    {}
  ) as Pick<T, K>;
}

export function merge<
  T extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements = "div"
>(styles: string, rest: React.ComponentProps<T>): React.ComponentProps<T> {
  return {
    ...rest,
    className: [rest.className, styles].join(" ").trim(),
  };
}

export function cx(...classes: string[]) {
  return classes.filter(Boolean).join(" ").trim();
}

export class SWRError extends Error {
  info?: string;
  status?: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new SWRError("An error occurred while fetching the data.");
    // Attach extra info to the error object.

    toast.error("An error occured, please try again");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function isDatePast(date: Date): boolean {
  const now = new Date();
  return date.getTime() < now.getTime();
}

export function getDifference(date: Date) {
  const now = new Date();
  const difference = isDatePast(date)
    ? now.getTime() - date.getTime()
    : date.getTime() - now.getTime();

  const timeUnits = [
    { label: "year", duration: 31536000000 },
    { label: "month", duration: 2592000000 },
    { label: "week", duration: 604800000 },
    { label: "day", duration: 86400000 },
    { label: "hour", duration: 3600000 },
    { label: "minute", duration: 60000 },
    { label: "second", duration: 1000 },
  ];

  for (const unit of timeUnits) {
    const unitDifference = Math.floor(difference / unit.duration);
    if (unitDifference >= 1 && !["minute", "second"].includes(unit.label)) {
      return `${unitDifference} ${unit.label}${unitDifference > 1 ? "s" : ""}`;
    } else {
      return "Now";
    }
  }

  return "Now";
}
