import { generateBlogPost } from "@/lib/generateContent";
import { sanityCreate } from "@/sanity/lib/sanityCreate";
import { sanityUploadImage } from "@/sanity/lib/sanityUploadImage";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import getSlug from "speakingurl";

export const maxDuration = 60;

export async function POST(req: Request) {
  const request = await req.json();
  const {
    prompt,
    userId,
    userIsAdmin,
    selectedAuthorId,
    // imageIdInSanity,
    imageKeywords,
  }: {
    prompt: string;
    userId: string;
    userIsAdmin: boolean | unknown;
    selectedAuthorId: string;
    imageIdInSanity: string;
    imageKeywords: string;
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

  const aiGeneratedContent = await generateBlogPost(prompt, selectedAuthorId);
  const parsedContent = JSON.parse(aiGeneratedContent);
  const imageQueryforPixabay = imageKeywords.split(" ").join("+");

  const pixabayResponse = await axios.get(
    `https://pixabay.com/api/?key=${process.env.PIAXBAY_API_KEY}&q=${imageQueryforPixabay}&image_type=photo&orientation=horizontal`
  );
  console.log(`Pixabay response: ${pixabayResponse.data.hits[0].webformatURL}`);

  const sanityUploadResponse = await sanityUploadImage(
    pixabayResponse.data.hits[0].webformatURL,
    imageKeywords
  );

  console.log(`Sanity upload response: ${sanityUploadResponse}`);

  if (!sanityUploadResponse) {
    return new Response(`Failed to upload image to Sanity`, { status: 500 });
  }

  try {
    await sanityCreate({
      aiGeneratedPayload: JSON.parse(aiGeneratedContent),
      mainImageId: sanityUploadResponse,
    });
    const postSlug = getSlug(parsedContent.title, {
      separator: "-",
      symbols: false,
      lang: "en",
      mark: false,
      truncate: 60,
    });
    revalidatePath("/blog");
    return new Response(postSlug, { status: 200 });
  } catch (error) {
    return new Response(`Failed to create blog post, error: ${error}`, {
      status: 500,
    });
  }
}
