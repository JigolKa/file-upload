import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/instance";
import { omit, pick } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recents } = req.query;

  const files = await prisma.file.findMany();

  const sortedFiles = files
    .sort((a, b) => +b.createdAt - +a.createdAt)
    .filter((v) => v.uploaderName !== "JigolKa");
  res.json(
    recents
      ? sortedFiles.slice(0, 4).map((v) => omit(v, "ipAddress", "updatedAt"))
      : sortedFiles
  );
}
