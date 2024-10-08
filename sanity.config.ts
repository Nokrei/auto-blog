import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "@/sanity/schemas";

export default defineConfig({
  name: "auto-blog-studio",
  title: "auto-blog-studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool()],

  schema: {
    types: schemas,
  },
});
