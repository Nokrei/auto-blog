import { client } from "@/sanity/lib/client";

type PropsType = {
  content: {
    title: string;
    subtitle: string;
    summary: string;
    content: unknown;
  };
};

export async function sanityCreate({ content }: PropsType) {
  // const postSlug = content.title.toLowerCase().replace(/\s/g, "-");
  return client
    .create({
      _type: "blogPost",
      title: content.title,
      slug: {
        _type: "slug",
        current: "jdhasjkdashkj",
      },
      subtitle: content.subtitle,
      excerpt: content.summary,
      publishedAt: new Date(),
      content: content.content,
    })
    .then((response) => {
      console.log(`Created blog post with ID: ${response._id}`);
    })
    .catch((error) => {
      console.error(
        `Sanity Error: Failed to create blog post: ${error.message}`
      );
    });
}
