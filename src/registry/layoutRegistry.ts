import { LayoutConfig } from "../types";

export const LAYOUTREGISTRY: Record<string, LayoutConfig> = {
  login: {
    name: "login",
    type: "components:layout",
    providers: {
      simple: {
        components: [
          { file_name: "page.tsx", path: "/" },
          { file_name: "button.tsx", path: "/_components" },
          { file_name: "input.tsx", path: "/_components" },
          { file_name: "checkbox.tsx", path: "/_components" },
          { file_name: "label.tsx", path: "/_components" },
          { file_name: "card.tsx", path: "/_components" },
        ],
        dependencies: [
          "@radix-ui/react-slot@latest",
          "class-variance-authority@latest",
          "clsx@latest",
          "lucide-react@latest",
          "@radix-ui/react-label@latest",
          "@radix-ui/react-checkbox@latest",
          "@hookform/resolvers@latest",
          "react-hook-form@latest",
          "zod@latest",
        ],
      },
      microsoft: {
        components: [
          { file_name: "page.tsx", path: "/" },
          { file_name: "button.tsx", path: "/_components" },
          { file_name: "input.tsx", path: "/_components" },
        ],
        dependencies: [
          "@radix-ui/react-slot@latest",
          "lucide-react@latest",
          "clsx@latest",
          "tailwind-merge@latest",
        ],
      },
    },
  },
};
