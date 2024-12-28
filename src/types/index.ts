export interface ComponentConfig {
  name: string;
  type: "components:ui" | "components:layout";
  files: [{ file_name: string; path: string }];
  dependencies: string[];
}

export interface LayoutConfig {
  name: string;
  type: "components:ui" | "components:layout";
  providers: {
    [providerName: string]: {
      components: { file_name: string; path: string }[];
      dependencies: string[];
    };
  };
}