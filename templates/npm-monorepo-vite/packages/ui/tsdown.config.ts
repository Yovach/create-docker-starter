import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
    entry: ["./src/index.ts"],
    dts: true,
    unbundle: true,
    sourcemap: true,
    platform: "neutral",
    exports: {
        all: false,
    },
});

export default config;
