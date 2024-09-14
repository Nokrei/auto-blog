import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "@/sanity/schemas";

export default defineConfig({
  name: "auto-blog-studio",
  title: "auto-blog-studio",

  projectId: "4dvi0604",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],

  schema: {
    types: schemas,
  },
});
