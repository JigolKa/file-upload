// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await new Promise((resolve, reject) => {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  //return the data back or just do whatever you want with it
  res.status(200).json({
    status: "ok",
    data,
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
