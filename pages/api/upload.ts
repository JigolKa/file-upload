// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { Storage } from "megajs";
import fs from "fs";
import os from "os";
import { getPath, retrieveIP, slugify } from "@/utils";
import { nanoid } from "nanoid";
import prisma from "@/prisma/instance";
import { BASE_URL } from "@/config";

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
    files: formidable.Files;
    fields: formidable.Fields;
  }>((resolve, reject) => {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) reject({ err });

      resolve({
        files,
        fields,
      });
    });
  });

  console.log("🚀 ~ file: upload.ts:27 ~ data:", data);

  const ip = retrieveIP(req);

  for (const val of Object.values(data.files)) {
    const file = val instanceof Array ? val[0] : val;

    const fileParts = file.originalFilename?.split(".") || [];
    const newPath =
      fileParts
        .map((v) => slugify(v))
        .slice(0, -1)
        .join(".") +
      "-" +
      nanoid(7) +
      "." +
      fileParts.at(-1)?.toLowerCase();

    fs.renameSync(getPath(file.newFilename), getPath(newPath));

    const uploader = data.fields.uploaderName;

    const databaseFile = await prisma.file.create({
      data: {
        mimeType: file.mimetype,
        size: file.size,
        fileName: file.originalFilename || file.newFilename,
        url: `${BASE_URL}/api/file/${newPath}`,
        ipAddress: ip,
        slug: newPath,
        uploaderName: uploader
          ? uploader instanceof Array
            ? uploader[0]
            : uploader
          : "Anonymous",
      },
    });

    console.log(databaseFile);
  }

  // res.redirect(302, `/api/file/${newPath}`);

  res.setHeader("Content-Type", "text/plain");
  res.send("OK");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
