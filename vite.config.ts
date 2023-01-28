import { defineConfig, loadEnv } from "vite";
import react from "vite-preset-react";
import svgr from "vite-plugin-svgr";
import { ViteEjsPlugin } from "vite-plugin-ejs";

const serverVars = ["name"];

const config = {};

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  for (const value of serverVars) {
    config[value] = process.env[value];
  }

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      ViteEjsPlugin(
        {
          serverVars,
          config,
        },
        {
          ejs: {
            beautify: true,
          },
        },
      ),
    ],
    server: {
      base: "localhost",
      origin: "localhost",
      port: 7337,
      host: true,
      open: true,
    },
    preview: {
      port: 7337,
      host: true,
    },
    build: {
      sourcemap: true,
      minify: true,
      manifest: true,
    },
  });
};
