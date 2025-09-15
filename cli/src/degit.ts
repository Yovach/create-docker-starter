import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { x } from "tar";

export async function degit(
  repository: string,
  repositoryFolder: string,
  folder: string,
): Promise<void> {
  const repositoryUrl = `${repository}/archive/main.tar.gz`;
  const response = await fetch(repositoryUrl);
  if (!response.body) {
    throw new Error("Invalid body of response");
  }

  if (folder == null) {
    throw new Error("Missing destination folder");
  }

  const destinationFolder = path.join(folder);
  if (!existsSync(destinationFolder)) {
    await mkdir(destinationFolder, { recursive: true });
  }

  Readable.fromWeb(response.body).pipe(
    x({
      cwd: destinationFolder,
      strip: 3,
      strict: true,
      filter(path): boolean {
        return path.startsWith(
          "create-docker-starter-main/" + repositoryFolder,
        );
      },
    }),
  );
}
