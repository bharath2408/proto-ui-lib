#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add";
import { addComponents } from "./commands/addComponents";
import { addLayout } from "./commands/addLayout";
import { init } from "./commands/init";
import checkInitialization from "./utils/checkInitialization";
import { logger } from "./utils/logger";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("my-ui")
    .description("Add components to your application")
    .version("0.1.0");

  program
    .command("init")
    .description("Initialize your project with configurations")
    .option("-y, --yes", "Skip confirmation prompt")
    .action(init);

  const addCommand = program
    .command("add")
    .description("Add a resource to your project")
    .action(
      checkInitialization(async () => {
        add();
      })
    );

  addCommand
    .command("components <component>")
    .description("Add a component to your project")
    .option("-y, --yes", "Skip confirmation prompt")
    .option("-o, --overwrite", "Overwrite existing files")
    .action(
      checkInitialization(async (component: string, option) => {
        addComponents(component, option);
      })
    );

  addCommand
    .command("layout <layout>")
    .description("Add a component to your project")
    .option("-y, --yes", "Skip confirmation prompt")
    .option("-o, --overwrite", "Overwrite existing files")
    .action(
      checkInitialization(async (layout, options) => {
        addLayout(layout, options);
      })
    );

  program.parse();
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
