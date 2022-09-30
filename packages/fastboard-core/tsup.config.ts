import { defineConfig } from "tsup";
import { main, version } from "./package.json";

export default defineConfig({
  entry: [main],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  platform: "browser",
  target: "esnext",
  dts: true,
  define: {
    __NAME__: JSON.stringify("@netless/fastboard"),
    __VERSION__: JSON.stringify(version),
  },
  treeshake: true,
});
