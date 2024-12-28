import { ComponentConfig } from "../types";

export const REGISTRY: Record<string, ComponentConfig> = {
  button: {
    name: "button",
    type: "components:ui",
    files: [{ file_name: "button.tsx", path: "/components/ui" }],
    dependencies: [
      "@radix-ui/react-slot@latest",
      "class-variance-authority@latest",
      "lucide-react@latest",
    ],
  },
  input: {
    name: "input",
    type: "components:ui",
    files: [{ file_name: "input.tsx", path: "/components/ui" }],
    dependencies: ["lucide-react@latest"],
  },
  select: {
    name: "select",
    type: "components:ui",
    dependencies: ["@radix-ui/react-select@latest", "lucide-react@latest"],
    files: [{ file_name: "select.tsx", path: "/components/ui" }],
  },
  bentogrid: {
    name: "bentogrid",
    type: "components:ui",
    dependencies: [],
    files: [{ file_name: "bentogrid.tsx", path: "/components/ui" }],
  },
  card: {
    name: "card",
    type: "components:ui",
    dependencies: [],
    files: [{ file_name: "card.tsx", path: "/components/ui" }],
  },
  checkbox: {
    name: "checkbox",
    type: "components:ui",
    dependencies: ["@radix-ui/react-checkbox@latest", "lucide-react@latest"],
    files: [{ file_name: "checkbox.tsx", path: "/components/ui" }],
  },
  label: {
    name: "label",
    type: "components:ui",
    dependencies: [
      "@radix-ui/react-label@latest",
      "class-variance-authority@latest",
    ],
    files: [{ file_name: "checkbox.tsx", path: "/components/ui" }],
  },
};
