import { spawn } from "child_process";
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js", // Main entry point
  output: {
    sourcemap: true,
    format: "iife", // Immediately Invoked Function Expression (needed for browsers)
    name: "app",
    file: "public/build/main.js", // Ensure this matches your index.html script reference
  },
  plugins: [
    svelte({
      compilerOptions: {
        // Enable runtime checks in development mode
        dev: !production,
      },
    }),
    // Extract CSS into a separate file for performance
    css({ output: "bundle.css" }),

    // Resolve imports from `node_modules`
    resolve({
      browser: true,
      dedupe: ["svelte"],
      exportConditions: ["svelte"],
    }),

    // Convert CommonJS modules to ES6
    commonjs(),

    // Start the dev server in development mode
    !production && serve(),

    // Watch the public directory and reload in development mode
    !production && livereload("public"),

    // Minify for production builds
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
