// src/commands/init.ts
import { execa } from "execa";
import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger";
import { prompts } from "../utils/prompts";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function init(options: { yes?: boolean }) {
  const spinner = logger.spinner("Initializing project...");

  try {
    if (!options.yes) {
      const response = await prompts.forInit();

      if (!response.proceed) {
        spinner.info("Initialization cancelled");
        return;
      }

      const componentsDir = response.componentsDir || "components";
      const baseDir = process.cwd();
      await fs.ensureDir(path.join(baseDir, componentsDir, "ui"));
      const libDir = path.join(baseDir, "lib");
      await fs.ensureDir(libDir);

      const sourceFilePath = path.join(__dirname, "../src/lib/utils.ts"); // Path to the source file
      const destinationFilePath = path.join(libDir, "utils.ts"); // Path to the destination file
      const jsonFilePath = path.join(
        __dirname,
        "../src/templates/myui.config.json"
      );

      const destinationJsonPath = path.join(baseDir, "myui.config.json");

      await fs.copyFile(jsonFilePath, destinationJsonPath);

      // Copy the utils.ts file from source to destination
      await fs.copyFile(sourceFilePath, destinationFilePath);

      const commonJsonPath = path.join(__dirname, "..", "src", "common.json");
      const commonConfig = JSON.parse(fs.readFileSync(commonJsonPath, "utf-8"));
      const { requiredPackages, optionalPackages } = commonConfig;
      // Ask for additional dependencies
      const shouldInstallExtras = await prompts.confirm(
        "Would you like to install additional recommended dependencies?",
        true
      );

      const dependencies = [...requiredPackages];
      if (shouldInstallExtras) {
        dependencies.push(...optionalPackages);
      }

      await logger.logPackageInstallation(dependencies);

      spinner.succeed("Project initialized successfully");
    } else {
      // Automatic mode (when `yes` is provided)
      const baseDir = process.cwd();
      const componentsDir = "components";
      const libDir = path.join(baseDir, "lib");

      // Create directories
      await fs.ensureDir(path.join(baseDir, componentsDir, "ui"));
      await fs.ensureDir(libDir);

      // Copy the utils.ts file from the source directory to the lib directory
      const sourceFilePath = path.join(__dirname, "../src/lib/utils.ts"); // Path to the source file
      const destinationFilePath = path.join(libDir, "utils.ts"); // Path to the destination file

      const jsonFilePath = path.join(
        __dirname,
        "../src/templates/myui.config.json"
      );

      const destinationJsonPath = path.join(baseDir, "myui.config.json");

      await fs.copyFile(jsonFilePath, destinationJsonPath);

      await fs.copyFile(sourceFilePath, destinationFilePath);

      // Install default dependencies
      const dependencies = [
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ];

      spinner.start("Installing dependencies...");
      await execa("npm", ["install", ...dependencies]);

      spinner.succeed(
        "Project initialized successfully with default configuration"
      );
    }
  } catch (error) {
    spinner.fail("Failed to initialize project");
    throw error;
  }
}
