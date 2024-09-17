import { generateBlogPost } from "@/lib/generateContent";
import { sanityCreate } from "@/sanity/lib/sanityCreate";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const request = await req.json();
  const { content, userId, userIsAdmin } = request;

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

  const aiGeneratedContent = await generateBlogPost(content);

  // const richTextContent = [
  //   {
  //     markDefs: [],
  //     style: "normal",
  //     _key: "1",
  //     _type: "block",
  //     children: [{ _type: "span", text: aiGeneratedContent }],
  //   },
  // ];

  try {
    await sanityCreate({
      content: JSON.parse(aiGeneratedContent),
    });
    const postSlug = "example123ff21312".replace(/\s/g, "-");
    return new Response(postSlug, { status: 200 });
  } catch (error) {
    return new Response(`Failed to create blog post, error: ${error}`, {
      status: 500,
    });
  }
}
