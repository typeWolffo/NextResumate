/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import crypto from "crypto";
import fs from "fs-extra";
import { type NextApiRequest, type NextApiResponse } from "next";
import os from "os";
import path from "path";
import pdfParse from "pdf-parse";
import { pipeline } from "stream";
import { promisify } from "util";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res.status(400).send("Invalid Content-Type");
  }

  try {
    const hash = crypto.createHash("md5");
    const fileName = `${hash.update(Date.now().toString()).digest("hex")}.pdf`;
    const filePath = path.join(os.tmpdir(), fileName);
    const writeStream = fs.createWriteStream(filePath);
    await promisify(pipeline)(req, writeStream);

    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    console.log(data.text);

    await fs.remove(filePath);

    res.send("File uploaded");
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send({ message: "Server error", error });
  }
}
