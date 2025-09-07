#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { styleText } from "node:util";
import prompts from "prompts";

const response = await prompts([
  {
    type: "text",
    name: "directory",
    message: "In which folder do you want to create your project?",
    validate: (text) =>
      text.length >= 1
        ? true
        : styleText(["red"], "Please enter at least 1 character"),
  },
  {
    type: "autocomplete",
    name: "value",
    choices: [
      {
        title: styleText(["bgBlue", "white"], " Node.js + TypeScript "),
        value: "node",
        description: "A Node.js project with TypeScript and Docker",
      },
    ],
    message: "Which template do you want to use?",
  },
]);

if (existsSync(pathJoin(response.directory))) {
  console.error("This folder already exists");
  process.exit(1);
}

const degit = await import("degit");
const emitter = degit.default(
  `yovach/create-docker-starter/templates/${response.value}`,
);
await emitter.clone(response.directory);
