import { sanityUploadImage } from "@/sanity/lib/sanityUploadImage";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const request = await req.json();
  const {
    imageUrl,
    imageName,
    userId,
    userIsAdmin,
  }: {
    imageUrl: string;
    imageName: string;
    userId: string;
    userIsAdmin: boolean | unknown;
  } = request;

  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const currentUserId = user.id;
  if (currentUserId !== userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!userIsAdmin) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const response = await sanityUploadImage(imageUrl, imageName);
    console.log(`Sanity upload response: ${response}`);

    return new Response(response, { status: 200 });
  } catch (error) {
    console.error(`Failed to upload image`);
    return new Response(`Failed to upload image`, { status: 500 });
  }
}
