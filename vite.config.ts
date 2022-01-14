import path from "path";
import preact from "@preact/preset-vite";
import { defineConfig, type LibraryFormats } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const formats: LibraryFormats[] = ["es", "cjs"];

  return {
    plugins: [
      preact(),
      visualizer({ filename: "./node_modules/.visualizer/stats.html" }),
    ],
    build: {
      lib: {
        name: "Fastboard",
        entry: path.resolve(process.cwd(), "./src/index.ts"),
        fileName: "index",
      },
      minify: isProd,
      sourcemap: isProd,
      outDir: "dist",
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "src/index.ts"),
          preact: path.resolve(__dirname, "src/preact.tsx"),
        },
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
        }),
        output: formats.map(format => ({
          format,
          entryFileNames: ({ name }) => `${name}.${format}.js`,
          manualChunks: {},
          exports: "named",
        })),
      },
    },
  };
});
