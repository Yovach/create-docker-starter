import { defineConfig, type UserConfig } from "tsdown";

const userConfig: UserConfig = defineConfig({
  entry: "./src/main.ts",
  target: "node20",
  minify: true,
});

export default userConfig;
