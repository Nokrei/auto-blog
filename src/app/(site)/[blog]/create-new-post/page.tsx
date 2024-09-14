import { currentUser } from "@clerk/nextjs/server";
import CreatePostForm from "./_components/CreatePostForm";

export default async function CreateNewPostPage() {
  const user = await currentUser();
  if (!user) {
    return;
  }
  const userIsAdmin = user.privateMetadata.admin;
  const userId = user.id;
  return <CreatePostForm userIsAdmin={userIsAdmin} userId={user.id} />;
}
