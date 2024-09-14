import { createClient } from "next-sanity";

export const clientConfig = {
  apiVersion: "2024-09-14",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
};

export const client = createClient(clientConfig);
