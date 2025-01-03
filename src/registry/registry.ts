import { ComponentConfig } from "../types";

export const REGISTRY: Record<string, ComponentConfig> = {
  button: {
    name: "button",
    type: "components:ui",
    dependenciesComponent: ["slot"],
    files: [{ file_name: "button.tsx", path: "/components/ui" }],
    dependencies: ["class-variance-authority@latest", "lucide-react@latest"],
  },
  input: {
    name: "input",
    type: "components:ui",
    dependenciesComponent: [],
    files: [{ file_name: "input.tsx", path: "/components/ui" }],
    dependencies: ["lucide-react@latest"],
  },
  select: {
    name: "select",
    type: "components:ui",
    dependenciesComponent: [],
    dependencies: ["@radix-ui/react-select@latest", "lucide-react@latest"],
    files: [{ file_name: "select.tsx", path: "/components/ui" }],
  },
  bentogrid: {
    name: "bentogrid",
    type: "components:ui",
    dependenciesComponent: [],
    dependencies: [],
    files: [{ file_name: "bentogrid.tsx", path: "/components/ui" }],
  },
  card: {
    name: "card",
    dependenciesComponent: [],
    type: "components:ui",
    dependencies: [],
    files: [{ file_name: "card.tsx", path: "/components/ui" }],
  },
  checkbox: {
    name: "checkbox",
    dependenciesComponent: [],
    type: "components:ui",
    dependencies: ["@radix-ui/react-checkbox@latest", "lucide-react@latest"],
    files: [{ file_name: "checkbox.tsx", path: "/components/ui" }],
  },
  label: {
    name: "label",
    type: "components:ui",
    dependenciesComponent: [],
    dependencies: [
      "@radix-ui/react-label@latest",
      "class-variance-authority@latest",
    ],
    files: [{ file_name: "label.tsx", path: "/components/ui" }],
  },
  slot: {
    name: "slot",
    type: "components:ui",
    dependenciesComponent: [],
    dependencies: [
      "clsx@latest",
      "tailwind-merge@latest",
      "class-variance-authority",
    ],
    files: [{ file_name: "slot.tsx", path: "/components/ui" }],
  },
  breadcrumb: {
    name: "breadcrumb",
    type: "components:ui",
    dependenciesComponent: ["slot"],
    files: [{ file_name: "breadcrumb.tsx", path: "/components/ui" }],
    dependencies: [
      "class-variance-authority@latest",
      "clsx@latest",
      "tailwind-merge@latest",
      "lucide-react@latest",
    ],
  },
  dropdown: {
    name: "dropdown",
    type: "components:ui",
    dependenciesComponent: [],
    files: [{ file_name: "dropdown-menu.tsx", path: "/components/ui" }],
    dependencies: [
      "class-variance-authority@latest",
      "clsx@latest",
      "@radix-ui/react-dropdown-menu@latest",
      "tailwind-merge@latest",
      "lucide-react@latest",
    ],
  },
};
