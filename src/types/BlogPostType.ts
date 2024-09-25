import { PortableTextBlock } from "sanity";
import { AuthorType } from "./AuthorType";

export type BlogPostType = {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  author: AuthorType;
  publishedAt: string;
  excerpt: string;
  content: {
    sectionTitle: string;
    body: PortableTextBlock;
    _key: string;
  }[];
  mainImage: string;
  mainImageAlt: string;
};
