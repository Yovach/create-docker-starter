import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { Unpack, x } from "tar";

const DEFAULT_GIT_BRANCH = "main";

/**
 * Fetches the repository archive from the given URL and returns a readable stream.
 */
async function fetchRepositoryArchive(url: string): Promise<Readable> {
  const repositoryUrl = `${url}/archive/${DEFAULT_GIT_BRANCH}.tar.gz`;
  const response = await fetch(repositoryUrl);
  if (!response.body) {
    throw new Error("Invalid body of response");
  }

  return Readable.fromWeb(response.body);
}

/**
 * Extracts the archive by selecting the specified folder and placing its contents into the destination folder.
 */
function extractArchiveBySelectingFolder(
  repository: string,
  destinationFolder: string,
  repositoryFolder: string,
): Unpack {
  const repositoryName = repository.split("/").at(-1);
  if (repositoryName == null) {
    throw new Error("Invalid repository name");
  }

  return x({
    cwd: destinationFolder,
    strip: 3,
    strict: true,
    filter(path): boolean {
      return path.startsWith(
        `${repositoryName}-${DEFAULT_GIT_BRANCH}/${repositoryFolder}`,
      );
    },
  });
}

/**
 * Downloads and extracts the specified folder from the given repository into a local output directory.
 */
export async function downloadAndExtractFile(
  repository: string,
  repositoryFolder: string,
  folder: string,
): Promise<string> {
  const destinationFolder = pathJoin("output", folder);
  if (!existsSync(destinationFolder)) {
    await mkdir(destinationFolder, { recursive: true });
  }

  await pipeline(
    await fetchRepositoryArchive(repository),
    extractArchiveBySelectingFolder(
      repository,
      destinationFolder,
      repositoryFolder,
    ),
  );

  return destinationFolder;
}
