import { select, text } from "@clack/prompts";
import { styleText } from "node:util";

export function promptDirectory(): Promise<string | symbol> {
  return text({
    message: "In which folder do you want to create your project",
    validate(value): string | undefined {
      if (value.length === 0) {
        return styleText(["red"], "Please enter at least 1 character");
      }
      return undefined;
    },
  });
}

export function promptTemplate(): Promise<symbol | "node"> {
  return select({
    message: "Which template do you want to use?",
    options: [
      {
        label: styleText(["blue"], " Node.js + TypeScript "),
        value: "node",
        hint: "A Node.js project with TypeScript and Docker",
      },
      {
        label: styleText(["magenta"], " Monorepo (NPM) with Vite, TypeScript and React "),
        value: "npm-monorepo-vite",
        hint: "A NPM monorepo project with Vite, TypeScript, React and Docker",
      },
    ],
  });
}
