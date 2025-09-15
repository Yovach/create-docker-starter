import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { x } from "tar";

async function fetchRepositoryArchive(url: string): Promise<Readable> {
  const repositoryUrl = `${url}/archive/main.tar.gz`;
  const response = await fetch(repositoryUrl);
  if (!response.body) {
    throw new Error("Invalid body of response");
  }

  return Readable.fromWeb(response.body);
}

async function extractArchiveBySelectingFolder() {

}

export async function downloadAndExtractFile(
  repository: string,
  repositoryFolder: string,
  folder: string,
): Promise<void> {
  const body = await fetchRepositoryArchive(repository);

  const destinationFolder = path.join("output", folder);
  if (!existsSync(destinationFolder)) {
    await mkdir(destinationFolder, { recursive: true });
  }

  pipeline(
    body,
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
