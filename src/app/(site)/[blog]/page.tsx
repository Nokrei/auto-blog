import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allBlogPostsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { BlogPostType } from "@/types/BlogPostType";
import Link from "next/link";

export default async function AllBlogPostsPage() {
  const data = await sanityFetch<BlogPostType[]>({
    query: allBlogPostsQuery,
    tags: ["blogPost"],
  });

  return (
    <main className="max-w-7xl flex flex-col mx-auto gap-10 py-20">
      <h1 className="text-center text-5xl">All Blog posts</h1>
      <div className="flex justify-center">
        <Link href="/blog/create-new-post">
          <Button variant="outline">Create new</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-10">
        {data.map((post) => (
          <Card key={post._id} className="w-96 flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>{post.excerpt}</CardContent>
            </div>
            <CardFooter>
              <Link href={`/blog/${post.slug}`}>
                <Button variant="outline">Read more</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
