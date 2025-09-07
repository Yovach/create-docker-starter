import prompts from "prompts";
const response = await prompts([
  {
    type: "text",
    name: "directory",
    message: "In which folder do you want to create your project?",
    validate: (text) => text.length >= 1,
  },
  {
    type: "autocomplete",
    name: "value",
    choices: [
      {
        title: "Node.js with TypeScript",
        value: "node",
        description: "A Node.js project with TypeScript and Docker",
      },
    ],
    message: "Which template do you want to use?",
  },
]);

const degit = await import("degit");
const emitter = degit.default(
  `yovach/create-docker-starter/templates/${response.value}`,
  { cache: true },
);
await emitter.clone(response.directory);
