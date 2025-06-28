import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  dts: true,
  splitting: false,
  minify: false,
  bundle: true,
  target: "esnext",
});
