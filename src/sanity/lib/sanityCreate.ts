import { client } from "@/sanity/lib/client";
import getSlug from "speakingurl";

type PropsType = {
  aiGeneratedPayload: {
    title: string;
    subtitle: string;
    summary: string;
    content: unknown;
    author: {
      _ref: string;
      _type: "reference";
    };
  };
  mainImageId: string;
};

export async function sanityCreate({
  aiGeneratedPayload,
  mainImageId,
}: PropsType) {
  console.log(`Main image ID: ${mainImageId}`);

  return client
    .create({
      _type: "blogPost",
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: mainImageId,
        },
        alt: aiGeneratedPayload.title,
      },
      title: aiGeneratedPayload.title,
      slug: {
        _type: "slug",
        current: getSlug(aiGeneratedPayload.title, {
          separator: "-",
          symbols: false,
          lang: "en",
          mark: false,
          truncate: 60,
        }),
      },
      subtitle: aiGeneratedPayload.subtitle,
      excerpt: aiGeneratedPayload.summary,
      author: {
        _type: "reference",
        _ref: aiGeneratedPayload.author._ref,
      },
      publishedAt: new Date(),
      content: aiGeneratedPayload.content,
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
