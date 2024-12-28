// src/utils/prompts.ts
import promptsBase from "prompts";
import { color } from "./colors.js";
import { logger } from "./logger.js";

// Handle process termination
const onCancel = () => {
  logger.error("Operation cancelled");
  process.exit(0);
};

// Create prompts object with all methods
export const prompts = {
  async confirm(message: string, initial = false) {
    const { value } = await promptsBase(
      {
        type: "confirm",
        name: "value",
        message,
        initial,
      },
      { onCancel }
    );
    return value;
  },

  async select<T extends string>(
    message: string,
    choices: { title: string; value: T }[]
  ) {
    const { value } = await promptsBase(
      {
        type: "select",
        name: "value",
        message,
        choices,
      },
      { onCancel }
    );
    return value as T;
  },

  async text(message: string, initial?: string) {
    const { value } = await promptsBase(
      {
        type: "text",
        name: "value",
        message,
        initial,
      },
      { onCancel }
    );
    return value;
  },

  async multiselect<T extends string>(
    message: string,
    choices: { title: string; value: T }[]
  ) {
    const { value } = await promptsBase(
      {
        type: "multiselect",
        name: "value",
        message,
        choices,
      },
      { onCancel }
    );
    return value as T[];
  },

  async forInit() {
    const response = await promptsBase(
      [
        {
          type: "confirm",
          name: "proceed",
          message: "Would you like to proceed with initialization?",
          initial: true,
        },
        {
          type: "text",
          name: "componentsDir",
          message: "Where would you like to add your components?",
          initial: "components",
        },
        {
          type: "confirm",
          name: "typescript",
          message: "Would you like to use TypeScript?",
          initial: true,
        },
      ],
      { onCancel }
    );

    return response;
  },

  async forComponentConfig() {
    const response = await promptsBase(
      [
        {
          type: "text",
          name: "componentName",
          message: "What is your component name?",
          validate: (value) =>
            value.length === 0 ? `Component name is required` : true,
        },
        {
          type: "select",
          name: "style",
          message: "Which style would you like to use?",
          choices: [
            { title: "Default", value: "default" },
            { title: "New", value: "new" },
          ],
        },
        {
          type: "confirm",
          name: "typescript",
          message: "Would you like to use TypeScript?",
          initial: true,
        },
      ],
      { onCancel }
    );

    return response;
  },

  async forOverwrite(componentName: string) {
    const response = await promptsBase(
      {
        type: "confirm",
        name: "overwrite",
        message: `Component ${color.cyan(
          componentName
        )} already exists. Would you like to overwrite it?`,
        initial: false,
      },
      { onCancel }
    );

    return response.overwrite;
  },
  async forPath(message: string, defaultPath: string) {
    const response = await promptsBase(
      {
        type: "text",
        name: "path",
        message: `${message} (default: ${defaultPath}):`,
        initial: defaultPath,
      },
      { onCancel }
    );

    return response.path || defaultPath;
  },
};
