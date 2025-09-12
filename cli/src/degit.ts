import { createWriteStream, read } from "node:fs";
import { Readable } from "node:stream";

export async function degit(
  repository: string,
  folder: string,
  branch: string = "main",
): Promise<void> {
  const response = await fetch(repository);
  if (!response.body) {
    throw new Error("Invalid body of response");
  }

  console.log(response.body);

  const writableStream = createWriteStream("./output/");
  const readableStream = Readable.fromWeb(response.body);
  readableStream.pipe(writableStream);
}
