import { createClient } from "next-sanity";

export const clientConfig = {
  apiVersion: "2024-09-14",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
  token: process.env.SANITY_API_WRITE_TOKEN,
};

export const client = createClient(clientConfig);
