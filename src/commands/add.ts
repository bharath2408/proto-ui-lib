import { LAYOUTREGISTRY } from "@/registry/layoutRegistry";
import { REGISTRY } from "@/registry/registry";
import { logger } from "@/utils/logger";
import { prompts } from "@/utils/prompts";
import { addComponents } from "./addComponents";
import { addLayout } from "./addLayout";

type AddType = "components" | "layout";

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
  type?: AddType;
}

export async function add(options: AddOptions = {}) {
  try {
    // First, handle type selection
    let type = options.type;
    if (!type) {
      const typeResponse = await prompts.select("What would you like to add?", [
        { value: "components", title: "Component - UI component" },
        { value: "layout", title: "Layout - Layout with components" },
      ]);
      if (!typeResponse) return;
      type = typeResponse as AddType;
    }

    // Then, handle name input
    let name;
    if (type === "components") {
      // Show list of available components
      const componentNames = Object.keys(REGISTRY);
      if (componentNames.length === 0) {
        return logger.error("No components found in registry");
      }

      // Prompt user to select a component
      name = await prompts.select(
        "Select a component to add:",
        componentNames.map((component) => ({
          title: component,
          value: component,
        }))
      );
    } else if (type === "layout") {
      // Show list of available layouts
      const layoutNames = Object.keys(LAYOUTREGISTRY);
      if (layoutNames.length === 0) {
        return logger.error("No layouts found in registry");
      }

      // Prompt user to select a layout
      name = await prompts.select(
        "Select a layout to add:",
        layoutNames.map((layout) => ({
          title: layout,
          value: layout,
        }))
      );
    }

    // Validate the name
    if (!name || typeof name !== "string") {
      logger.error("Name cannot be empty");
      return;
    }

    // Validate name format
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      logger.error(
        "Name must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens"
      );
      return;
    }

    // Handle the add operation based on type
    switch (type) {
      case "components":
        await addComponents(name, options);
        break;
      case "layout":
        await addLayout(name, options);
        break;
      default:
        logger.error(`Invalid type: ${type}`);
        return;
    }

    logger.success(`Successfully added ${type}: ${name}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to add: ${error.message}`);
    } else {
      logger.error("An unknown error occurred");
    }
  }
}
