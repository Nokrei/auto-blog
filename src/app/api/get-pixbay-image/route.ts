import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const maxDuration = 60;

export async function POST(req: Request) {
  const request = await req.json();
  const {
    userId,
    userIsAdmin,
    imageKeywords,
  }: {
    imageKeywords: string;
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
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIAXBAY_API_KEY}&q=${imageKeywords}&image_type=photo`
    );
    console.log(`Pixbay: ${response.data.hits[0].webformatURL}`);

    return new Response(response.data.hits[0].webformatURL, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`Failed to get image`, {
      status: 500,
    });
  }
}
