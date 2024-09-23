import { currentUser } from "@clerk/nextjs/server";
import CreatePostForm from "./_components/CreatePostForm";
import { AuthorType } from "@/types/AuthorType";
import { allAuthorsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/sanityFetch";

export default async function CreateNewPostPage() {
  const user = await currentUser();
  if (!user) {
    return;
  }
  const allAuthorData = await sanityFetch<AuthorType[]>({
    query: allAuthorsQuery,
    tags: ["author"],
  });

  const userIsAdmin = user.privateMetadata.admin;
  const userId = user.id;
  return (
    <CreatePostForm
      userIsAdmin={userIsAdmin}
      userId={userId}
      authors={allAuthorData}
    />
  );
}
