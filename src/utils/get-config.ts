import { cosmiconfig } from "cosmiconfig";
import { z } from "zod";

const configSchema = z.object({
  style: z.enum(["default", "new"]).optional(),
  typescript: z.boolean().optional(),
  tailwind: z
    .object({
      config: z.string(),
      css: z.string(),
    })
    .optional(),
  components: z
    .object({
      path: z.string(),
      prefix: z.string(),
    })
    .optional(),
});

export async function getConfig() {
  const explorer = cosmiconfig("components");
  const result = await explorer.search();

  return configSchema.parse(result?.config ?? {});
}
