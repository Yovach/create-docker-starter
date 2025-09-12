#!/usr/bin/env node

import { isCancel, log } from "@clack/prompts";
import { promptDirectory, promptTemplate } from "./prompts.ts";
import { existsSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { degit } from "./degit.ts";

function handleSigTerm() {
  return process.exit(0);
}

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

function logCancel(): void {
  log.error("Operation cancelled");
}

const directory = await promptDirectory();
if (isCancel(directory)) {
  logCancel();
  process.exit()
}

const directoryAsString = directory.toString();

if (existsSync(pathJoin(process.cwd(), directoryAsString))) {
  log.error("This folder already exists");
  process.exit(1);
}

const template = await promptTemplate();
if (isCancel(template)) {
  logCancel();
  process.exit();
}

const emitter = await degit(
  `https://github.com/yovach/create-docker-starter`, `templates/${template}`,
);
console.log(emitter);
// try {
//   emitter.on("warn", (warn) => log.warn(warn.message));
//   await emitter.clone(directoryAsString);

//   const lines = [
//     `Project ${directoryAsString} created successfully!`,
//     `Follow these steps to get started:`,
//     `- cd ${directoryAsString}`,
//     `- make dev`,
//   ];

//   log.info(lines.join("\n"));
// } catch (err) {
//   if (err instanceof Error) {
//     log.error(
//       "Failed to create project " + directoryAsString + ": " + err.message,
//     );
//   } else {
//     log.error(
//       "Failed to create project " + directoryAsString + ": " + String(err),
//     );
//   }
// }
