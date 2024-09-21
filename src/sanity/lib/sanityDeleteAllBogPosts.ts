import { client } from "@/sanity/lib/client";

export async function sanityDeleteAllBlogPosts() {
  return client
    .delete({
      query: '*[_type == "blogPost"]',
    })
    .then(() => {
      console.log(`Deleted all blog posts.`);
    })
    .catch((error) => {
      console.error(
        `Sanity Error: Failed to delete blog posts: ${error.message}`
      );
    });
}
