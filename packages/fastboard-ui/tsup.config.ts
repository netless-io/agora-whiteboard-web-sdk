import { defineConfig } from "tsup";
import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { sass } from "@netless/esbuild-plugin-inline-sass";
import { main } from "./package.json";

export default defineConfig([
  {
    entry: [main],
    format: ["cjs", "esm"],
    sourcemap: true,
    clean: true,
    platform: "browser",
    target: "esnext",
    esbuildPlugins: [svelte(), sass({ emitCss: true })],
    loader: { ".svg": "dataurl" },
    dts: true,
    treeshake: true,
  },
  {
    entry: { "index.svelte": main },
    format: ["esm"],
    external: ["svelte"],
    sourcemap: true,
    clean: true,
    platform: "browser",
    target: "esnext",
    esbuildPlugins: [svelte(), sass({ strip: true })],
    loader: { ".svg": "dataurl" },
    treeshake: true,
  },
]);
