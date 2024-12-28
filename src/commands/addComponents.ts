import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { REGISTRY } from "../registry/registry";
import { getConfig } from "../utils/get-config";
import { logger } from "../utils/logger";
import { prompts } from "../utils/prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addComponents(
  component: string,
  options: { yes?: boolean; overwrite?: boolean }
) {
  const spinner = logger.spinner(`Adding ${component} component...`);

  try {
    // Get component from registry
    const componentConfig = REGISTRY[component];
    if (!componentConfig) {
      return logger.error(`Component "${component}" not found in registry`);
    }

    // Get project config
    const config = await getConfig();

    // Define paths
    const templatesRoot = path.join(__dirname, "../src/templates/components");
    const componentTemplateDir = path.join(templatesRoot, component);

    const dependenciesToInstall = componentConfig.dependencies || [];
    if (dependenciesToInstall.length > 0) {
      spinner.start("Installing dependencies...");
      try {
        // Pass each dependency as a separate argument
        await execa("npm", ["install", ...dependenciesToInstall]);
        spinner.succeed("Dependencies installed successfully");
      } catch (err) {
        spinner.fail("Failed to install dependencies");
        if (err instanceof Error) {
          logger.error(err.message);
        }
        return;
      }
    }

    // Verify template directory exists
    if (!(await fs.pathExists(componentTemplateDir))) {
      logger.error(
        `Template directory not found: ${componentTemplateDir}\n` +
          `Please ensure the template exists in your package.`
      );
    }

    // Check for existing files
    for (const fileConfig of componentConfig.files) {
      const targetPath = path.join(process.cwd(), fileConfig.path);
      const targetFile = path.join(targetPath, fileConfig.file_name);

      const exists = await fs.pathExists(targetFile);
      if (exists && !options.overwrite && !options.yes) {
        spinner.stop();
        const shouldOverwrite = await prompts.forOverwrite(component);
        if (!shouldOverwrite) {
          logger.info("Skipping existing component");
          return;
        }
        spinner.start();
      }

      // Create directory and copy file
      await fs.ensureDir(targetPath);
      const source = path.join(componentTemplateDir, fileConfig.file_name);

      if (!(await fs.pathExists(source))) {
        spinner.fail(
          `Template file not found: ${source}\nPlease ensure the template file exists in your package.`
        );
        return;
      }

      await fs.copyFile(source, targetFile);
    }

    spinner.succeed(`Added ${component} component`);
  } catch (error) {
    spinner.fail(`Failed to add ${component} component`);
    if (error instanceof Error) {
      logger.error(error.message);
    }
    throw error;
  }
}
