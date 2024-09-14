import { sanityCreate } from "@/sanity/lib/sanityCreate";

export async function POST(req: Request) {
  const request = await req.json();
  const { title, subtitle, summary, publishedAt, content } = request;
  try {
    await sanityCreate({
      title,
      subtitle,
      excerpt: summary,
      publishedAt,
      content,
    });
    return new Response("Blog post created successfully", { status: 200 });
  } catch (error) {
    return new Response(
      `Failed to create blog post, error: ${JSON.stringify(error)}`,
      { status: 500 }
    );
  }
}
