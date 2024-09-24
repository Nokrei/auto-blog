import { client } from "@/sanity/lib/client";
import axios from "axios";

export async function sanityUploadImage(imageUrl: string, imageName: string) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageAsset = await client.assets.upload(
      "image",
      Buffer.from(response.data),
      {
        filename: imageName,
      }
    );
    console.log(`Sanity upload asset: ${imageAsset}`);

    return imageAsset._id;
  } catch (error) {
    console.error(`Failed to upload image`);
  }
}
