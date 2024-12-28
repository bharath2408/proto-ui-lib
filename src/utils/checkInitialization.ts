import fs from "fs";
import path from "path";
import { logger } from "./logger";

type CommanderCallback = (...args: any[]) => void | Promise<void>;

// Helper function to check if the project is initialized
export const checkInitialization = (
  callback: CommanderCallback
): CommanderCallback => {
  return async (...args: any[]): Promise<void> => {
    try {
      const configFilePath = path.join(process.cwd(), "myui.config.json");

      // Check if the config file exists
      if (!fs.existsSync(configFilePath)) {
        logger.info(
          "Configuration file not found. Please initialize the project."
        );
        return;
      }

      // Read and parse the config file
      const configContent = fs.readFileSync(configFilePath, "utf-8");
      const config = JSON.parse(configContent);

      // Check if the "initialized" key is true
      if (config && config.initialized) {
        await callback(...args); // Call the callback with the original arguments
      } else {
        logger.error("Project is not initialized. Please initialize first.");
      }
    } catch (error) {
      logger.error("Error reading the configuration file");
    }
  };
};

export default checkInitialization;
