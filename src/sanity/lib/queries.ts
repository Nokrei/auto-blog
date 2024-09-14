import { groq } from "next-sanity";

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    excerpt,
  }
`;

export const blogPostQuery = groq`
 *[_type == "blogPost" && slug.current == $slug][0] {
     _id,
     title,
     subtitle,
     slug,
     publishedAt,
     excerpt,
     content,
 }
 `;
