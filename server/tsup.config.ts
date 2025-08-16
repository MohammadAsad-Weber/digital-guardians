import path from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  target: "ES2020",
  format: ["esm"],
  sourcemap: true,
  clean: true,
  dts: true,
  tsconfig: "./tsconfig.json",
  entry: ["./src/index.ts"],
  outDir: "./dist",
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(__dirname, "src/"),
    };
  },
});
