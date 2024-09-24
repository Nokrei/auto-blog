import { groq } from "next-sanity";

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
  }
`;

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    "author": author->{
      name,
      writingStyle,
      styleModifier,
      "avatar": avatar.asset->url,
    },
    publishedAt,
    excerpt,
    content,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
  }
`;

export const allAuthorsQuery = groq`
  *[_type == "author"]{
    _id,
    name,
    writingStyle,
    styleModifier,
    "avatar": avatar.asset->url,
    "alt": avatar.alt,
  }
`;

export const authorQuery = groq`
  *[_type == "author" && _id == $id][0]{
    _id,
    name,
    writingStyle,
    styleModifier,
    "avatar": avatar.asset->url,
    "alt": avatar.alt,
  }
`;
