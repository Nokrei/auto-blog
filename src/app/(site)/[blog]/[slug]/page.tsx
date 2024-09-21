import { blogPostQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";

import { BlogPostType } from "@/types/BlogPostType";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";

type PropsType = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: PropsType) {
  const data = await sanityFetch<BlogPostType>({
    query: blogPostQuery,
    tags: ["blogPost"],
    params,
  });

  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-20 py-32">
      <div className="flex flex-col gap-5 items-center justify-center text-center max-w-lg mx-auto">
        <p className="text-sm">
          {new Date(data.publishedAt).toLocaleDateString("en-gb", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-4xl">{data.title}</h1>
        <div className="flex items-center gap-3">
          <Image
            src={data.author.avatar}
            alt={data.author.alt}
            width={50}
            height={50}
            className="rounded-full"
          />
          <p>{data.author.name}</p>
        </div>
      </div>
      <div className="flex gap-5 flex-col">
        {data.content.map((section) => (
          <div key={section._key} className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">{section.sectionTitle}</h3>
            <PortableText value={section.body} />
          </div>
        ))}
      </div>
    </main>
  );
}
