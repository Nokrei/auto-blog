import { sanityUploadImage } from "@/sanity/lib/sanityUploadImage";

export async function POST(req: Request) {
  const request = await req.json();
  const { imageUrl, imageName }: { imageUrl: string; imageName: string } =
    request;

  try {
    const response = await sanityUploadImage(imageUrl, imageName);
    console.log(`Sanity upload response: ${response}`);

    return new Response(response, { status: 200 });
  } catch (error) {
    console.error(`Failed to upload image`);
    return new Response(`Failed to upload image`, { status: 500 });
  }
}
