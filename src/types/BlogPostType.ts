import { PortableTextBlock } from "sanity";

export type BlogPostType = {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  content: PortableTextBlock;
};
