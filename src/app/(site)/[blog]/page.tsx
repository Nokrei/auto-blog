import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allBlogPostsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { BlogPostType } from "@/types/BlogPostType";

export default async function AllBlogPostsPage() {
  const data = await sanityFetch<BlogPostType[]>({
    query: allBlogPostsQuery,
    tags: ["blogPost"],
  });

  return (
    <main className="max-w-7xl flex flex-col mx-auto gap-10 py-20">
      <h1 className="text-center text-5xl">All Blog posts</h1>
      <div>
        {data.map((post) => (
          <Card key={post._id} className="w-96">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>{post.excerpt}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
