import { client } from "@/sanity/lib/client";

type PropsType = {
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: Date;
  content: unknown;
};

export async function sanityCreate({
  title,
  subtitle,
  excerpt,
  publishedAt,
  content,
}: PropsType) {
  const postSlug = title.toLowerCase().replace(/\s/g, "-");
  return client
    .create({
      _type: "blogPost",
      title,
      slug: {
        _type: "slug",
        current: postSlug,
      },
      subtitle,
      excerpt,
      publishedAt,
      content,
    })
    .then((response) => {
      console.log(`Created blog post with ID: ${response._id}`);
    })
    .catch((error) => {
      console.error(`Failed to create blog post: ${error.message}`);
    });
}
