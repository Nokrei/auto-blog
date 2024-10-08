import { generateBlogPost } from "@/lib/generateContent";
import { sanityCreate } from "@/sanity/lib/sanityCreate";
import { currentUser } from "@clerk/nextjs/server";
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
    imageIdInSanity,
  }: {
    prompt: string;
    userId: string;
    userIsAdmin: boolean | unknown;
    selectedAuthorId: string;
    imageIdInSanity: string;
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

  try {
    await sanityCreate({
      aiGeneratedPayload: JSON.parse(aiGeneratedContent),
      mainImageId: imageIdInSanity,
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
