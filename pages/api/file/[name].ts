import { NextApiRequest, NextApiResponse } from "next";
import os from "os";
import mime from "mime";
import fs from "fs";
import { getPath } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  if (!name) {
    return res.status(404).send("Not Found");
  }

  const path = getPath(name as string);

  if (!fs.existsSync(path)) {
    return res.status(404).send("Not Found");
  }

  const type = mime.getType(path) ?? "text/plain";

  const stat = fs.statSync(path);

  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": stat.size,
  });

  var readStream = fs.createReadStream(path);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
}
