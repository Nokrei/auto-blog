import { createClient } from "next-sanity";

const token =
  "skWJHZJUOZIT3rRTQWyZWSpybvT22bpgdRzXvdbHuz1KTSR6J7m9U9qOzkOTJtiSvrJQj59T9AIXNtzQhIce3xqccf40DwEqymZ1BxqlFrsp2nfUrFPm2VN5yt09FnyFppn25jUjVKTTIk25Lk5LKwbf8Tq39xskVIpxeKjgzshJtxu259aM";

export const clientConfig = {
  apiVersion: "2024-09-14",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
  token: token,
};

export const client = createClient(clientConfig);
