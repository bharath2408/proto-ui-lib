// utils/startStudio.ts
import react from "@vitejs/plugin-react";
import { createServer } from "vite";

import { logger } from "@/utils/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startStudio(port: string): Promise<void> {
  try {
    console.log(path.resolve(__dirname, "../src/templates"));
    const server = await createServer({
      root: path.resolve(__dirname, "../src/studio"),
      plugins: [react()],
      server: {
        port: parseInt(port),
        open: true,
      },
      resolve: {
        alias: {
          "@/components": path.resolve(
            __dirname,
            "../src/templates/components"
          ),
          "@/templates": path.resolve(__dirname, "../src/templates"),
          "@/utils": path.resolve(__dirname, "../src/utils"),
          "@/lib": path.resolve(__dirname, "../src/lib"),
        },
      },
    });

    await server.listen();
    logger.info(`Studio started at http://localhost:${port}`);
  } catch (error) {
    logger.error("Failed to start studio:");
    process.exit(1);
  }
}
