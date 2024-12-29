import { LAYOUTREGISTRY } from "@/registry/layoutRegistry";
import { logger } from "@/utils/logger";
import { prompts } from "@/utils/prompts";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { addComponents } from "./addComponents";

type AddType = "components" | "layout";

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
  type?: AddType;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getTargetDirectory() {
  const cwd = process.cwd();
  const srcPath = path.join(cwd, "src");
  const srcAppPath = path.join(srcPath, "app");
  const appPath = path.join(cwd, "app");

  if (await fs.pathExists(srcAppPath)) {
    return srcAppPath;
  } else if (await fs.pathExists(appPath)) {
    return appPath;
  } else if (await fs.pathExists(srcPath)) {
    await fs.ensureDir(srcAppPath);
    return srcAppPath;
  } else {
    const response = await prompts.text(
      "Neither 'src/app' nor 'app' directory exists. Please provide a folder name to create:",
      "app"
    );

    if (!response.folderName) {
      console.error("No folder name provided. Exiting...");
      process.exit(1);
    }

    const newFolderPath = path.join(cwd, response.folderName);
    await fs.ensureDir(newFolderPath); // Create the folder
    console.log(`Folder created at: ${newFolderPath}`);
    return newFolderPath;
  }
}

async function getLayoutPath(appDir: string, layoutName: string) {
  const targetPath = await prompts.forPath(
    "Enter the path where you want to add the layout (e.g., auth/login)",
    layoutName
  );
  return path.join(appDir, targetPath);
}

async function handleComponentDependencies(components: string[]) {
  if (!Array.isArray(components) || components.length === 0) {
    logger.info("No dependencies to handle.");
    return;
  }

  const options = { yes: false, overwrite: false };

  for (const component of components) {
    await addComponents(component, options);
  }
}

export async function addLayout(name: string, options: AddOptions) {
  const spinner = logger.spinner(`Adding layout: ${name}`);

  try {
    const layoutConfig = LAYOUTREGISTRY[name];
    if (!layoutConfig) {
      return logger.error(`Layout "${name}" not found in registry`);
    }

    // Retrieve available providers
    const providerNames = Object.keys(layoutConfig.providers);
    if (providerNames.length === 0) {
      return logger.error(`No providers found for layout "${name}"`);
    }

    // Prompt user to select a provider if multiple options exist
    const provider =
      providerNames.length === 1
        ? providerNames[0]
        : await prompts.select(
            "Select a provider for the layout:",
            providerNames.map((p) => ({ title: p, value: p }))
          );

    logger.info(`Selected provider: ${provider}`);

    const providerConfig = layoutConfig.providers[provider];
    if (!providerConfig) {
      return logger.error(
        `Provider "${provider}" not found for layout "${name}"`
      );
    }

    await handleComponentDependencies(providerConfig.dependenciesComponent);

    const templatesRoot = path.join(__dirname, "../src/templates/layout");
    const layoutSourceDir = path.join(templatesRoot, name, provider);

    if (!(await fs.pathExists(layoutSourceDir))) {
      return logger.error(`Template directory not found: ${layoutSourceDir}`);
    }

    const appDir = await getTargetDirectory();
    const layoutPath = await getLayoutPath(appDir, name);

    if (providerConfig.dependencies?.length) {
      spinner.start("Installing dependencies...");
      try {
        await execa("npm", ["install", ...providerConfig.dependencies]);
        spinner.succeed("Dependencies installed");
      } catch (err) {
        spinner.fail("Failed to install dependencies");
        if (err instanceof Error) logger.error(err.message);
        return;
      }
    }

    // Ensure source templates exist before proceeding
    for (const component of providerConfig.components) {
      const sourceFile = path.join(
        layoutSourceDir,
        component.path,
        component.file_name
      );
      if (!(await fs.pathExists(sourceFile))) {
        spinner.fail(`Template file not found: ${sourceFile}`);
        return;
      }
    }

    // Copy all components
    for (const component of providerConfig.components) {
      const targetPath = path.join(layoutPath, component.path);
      const targetFile = path.join(targetPath, component.file_name);
      const sourceFile = path.join(
        layoutSourceDir,
        component.path,
        component.file_name
      );

      const exists = await fs.pathExists(targetFile);
      if (exists && !options.overwrite && !options.yes) {
        spinner.stop();
        const shouldOverwrite = await prompts.confirm(
          `File "${component.file_name}" exists. Overwrite?`
        );
        if (!shouldOverwrite) {
          logger.info("Skipping existing file");
          continue;
        }
      }

      await fs.ensureDir(targetPath);
      await fs.copyFile(sourceFile, targetFile);
    }

    spinner.succeed(
      `Added layout "${name}" with provider "${provider}" to ${layoutPath}`
    );
  } catch (error) {
    spinner.fail(`Failed to add layout "${name}"`);
    if (error instanceof Error) logger.error(error.message);
    throw error;
  }
}
