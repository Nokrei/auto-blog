"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type PropsType = {
  userIsAdmin: boolean | unknown;
  userId: string;
};

export default function CreatePostForm({ userIsAdmin, userId }: PropsType) {
  const [prompt, setPrompt] = useState("");
  const [buttonText, setButtonText] = useState("Create post");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreatePostClick() {
    setButtonText("Creating post...");
    setIsLoading(true);
    toast.loading("Creating post...");
    await axios
      .post("/api/create-post", {
        userIsAdmin,
        userId,
        prompt,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.dismiss();
          toast.success(`Post created successfully!`, {
            action: {
              label: "View post",
              onClick: () => {
                window.location.href = `/blog/${response.data}`;
              },
            },
            duration: 10000,
          });
          setButtonText("Create another post");
          setIsLoading(false);
        }
        if (response.status === 500) {
          toast.dismiss();
          toast.error("Failed to create post");
          setButtonText("Create post");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error(`Failed to create post: ${error.response.data}`);
        setButtonText("Create post");
        setIsLoading(false);
      });
  }
  return (
    <main className="max-w-7xl mx-auto py-20 flex flex-col gap-10">
      <h1 className="text-center text-5xl">Create a new post</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Crate new post</CardTitle>
          <CardDescription>
            Your post will be automatically published to Sanity
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex gap-10"></div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              rows={10}
              onChange={(e) => setPrompt(e.target.value)}
              id="prompt"
              placeholder="Write your prompt here..."
            />
          </div>
        </CardContent>
        <CardFooter>
          {userIsAdmin ? (
            <Button
              disabled={!prompt || isLoading}
              onClick={() => handleCreatePostClick()}
              variant="outline"
            >
              {buttonText}
            </Button>
          ) : (
            <p>Only authorized users can publish posts</p>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
