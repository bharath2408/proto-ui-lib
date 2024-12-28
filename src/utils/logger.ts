// src/utils/logger.ts
import { execa } from "execa";
import kleur from "kleur";
import ora from "ora";

export const logger = {
  error: (message: string) => {
    console.error(kleur.red("error") + " - " + message);
  },
  warn: (message: string) => {
    console.warn(kleur.yellow("warn") + " - " + message);
  },
  info: (message: string) => {
    console.info(kleur.blue("info") + " - " + message);
  },
  success: (message: string) => {
    console.log(kleur.green("success") + " - " + message);
  },
  spinner: (message: string) => {
    return ora(message);
  },
  logPackageInstallation: async (packages: string[]) => {
    for (const pkg of packages) {
      const coloredPkg = kleur.green(pkg);
      const packageSpinner = ora(`Installing ${coloredPkg}`).start();
      try {
        await execa("npm", ["install", pkg]);

        packageSpinner.succeed(`${coloredPkg} installed successfully!`);
      } catch (error) {
        packageSpinner.fail(`${coloredPkg} failed to install.`);
        console.log(error);
      }
    }
  },
};
