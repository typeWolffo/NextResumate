import crypto from "crypto";
import fs from "fs-extra";
import { type NextApiRequest, type NextApiResponse } from "next";
import os from "os";
import path from "path";
import pdfParse from "pdf-parse";
import { pipeline } from "stream";
import { promisify } from "util";
import { env } from "@/env.mjs";
import { fetchResumeInformation } from "@/lib";

const METHOD_ALLOWED = "POST";
const CONTENT_TYPE = "multipart/form-data";
const TEMP_DIR = os.tmpdir();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function saveFile(req: NextApiRequest): Promise<string> {
  const hash = crypto.createHash("md5");
  const fileName = `${hash.update(Date.now().toString()).digest("hex")}.pdf`;
  const filePath = path.join(TEMP_DIR, fileName);
  const writeStream = fs.createWriteStream(filePath);

  await promisify(pipeline)(req, writeStream);

  return filePath;
}

async function processFile(
  filePath: string,
  res: NextApiResponse
): Promise<void> {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);

  try {
    const response = await fetchResumeInformation(data.text);
    res.send(response);
  } catch (error) {
    if (env.NODE_ENV === "development") {
      console.log(data.text);
    }
    res.status(500).send({ message: "Server error", error });
  }

  await fs.remove(filePath);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== METHOD_ALLOWED) {
    return res.status(405).send("Method Not Allowed");
  }

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes(CONTENT_TYPE)) {
    return res.status(400).send("Invalid Content-Type");
  }

  try {
    const filePath = await saveFile(req);
    await processFile(filePath, res);
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send({ message: "Server error", error });
  }
}
