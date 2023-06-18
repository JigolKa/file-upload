// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { Storage } from "megajs";
import fs from "fs";
import os from "os";
import { getPath, slugify } from "@/utils";
import { nanoid } from "nanoid";

const fileToBuffer = (file: formidable.File) => {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(file.filepath, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await new Promise<{
    file: formidable.File;
  }>((resolve, reject) => {
    const form = formidable();

    form.parse(req, async (err, _, files) => {
      if (err) reject({ err });
      resolve({
        file: files.file instanceof Array ? files.file[0] : files.file,
      });
    });
  });

  const fileParts = data.file.originalFilename?.split(".") || [];
  const newPath =
    fileParts
      .map((v) => slugify(v))
      .slice(0, -1)
      .join(".") +
    "-" +
    nanoid(7) +
    "." +
    fileParts.at(-1)?.toLowerCase();

  console.log("🚀 ~ file: new.ts:39 ~ newPath:", newPath);
  fs.renameSync(getPath(data.file.newFilename), getPath(newPath));

  res.redirect(302, `/api/file/${newPath}`);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
