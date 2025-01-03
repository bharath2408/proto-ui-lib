import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function studio(port: string) {
  // Resolve path to studio-ui folder relative to current file
  const studioPath = path.resolve(__dirname, "../studio-ui");

  // Check if studio-ui exists
  if (!fs.existsSync(studioPath)) {
    logger.error(
      `Studio UI directory not found at ${studioPath}. Ensure 'studio-ui' is included in your package.`
    );
    process.exit(1);
  }

  logger.info("Starting Studio UI...");

  // Execute commands to start the Studio UI
  const command = `cd ${studioPath} && npm install && npm run dev -- -p ${port}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Failed to start Studio UI: ${error.message}`);
      process.exit(1);
    }

    if (stderr) logger.error(`stderr: ${stderr}`);
    if (stdout) logger.info(stdout);

    logger.success(`Studio UI is running on port ${port}`);
  });
}
