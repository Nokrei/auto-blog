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
import { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthorType } from "@/types/AuthorType";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type PropsType = {
  userIsAdmin: boolean | unknown;
  userId: string;
  authors: AuthorType[];
};

export default function CreatePostForm({
  userIsAdmin,
  userId,
  authors,
}: PropsType) {
  const [isClient, setIsClient] = useState(false);
  const [imageKeywords, setImageKeywords] = useState("");
  const [prompt, setPrompt] = useState("");
  const [buttonText, setButtonText] = useState("Create post");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(authors[0]._id);

  async function handleCreatePostClick() {
    setButtonText("Creating post...");
    setIsLoading(true);
    toast.loading(`Searching for image...`);
    try {
      // Send keywords to Pixbay API, get image URL in pixabay.
      const pixabayResponse = await axios.post("/api/get-pixbay-image", {
        userId,
        userIsAdmin,
        imageKeywords,
      });
      toast.dismiss();
      if (pixabayResponse.status === 200) {
        toast.loading(`Image found! Uploading to Sanity...`);
      }
      if (pixabayResponse.status === 500) {
        toast.error("Failed to get image");
        setButtonText("Create post");
        setIsLoading(false);
        return;
      }
      const imageUrlFromPixbay = pixabayResponse.data;

      // Upload image to Sanity, get image ID in Sanity.
      const sanityUploadResponse = await axios.post("/api/upload-image", {
        userId,
        userIsAdmin,
        imageUrl: imageUrlFromPixbay,
        imageName: imageKeywords,
      });
      toast.dismiss();
      if (sanityUploadResponse.status === 200) {
        toast.loading(`Image uploaded to Sanity! Creating post...`);
      }
      if (sanityUploadResponse.status === 500) {
        toast.error("Failed to upload image");
        setButtonText("Create post");
        setIsLoading(false);
        return;
      }

      const imageIdInSanity = sanityUploadResponse.data;

      // Generate blog post with AI, send blog post to Sanity with image ID.
      const createPostResponse = await axios.post("/api/create-post", {
        userIsAdmin,
        userId,
        prompt,
        selectedAuthorId,
        imageIdInSanity,
      });
      if (createPostResponse.status === 200) {
        toast.dismiss();
        toast.success(`Post created successfully!`, {
          action: {
            label: "View post",
            onClick: () => {
              window.location.href = `/blog/${createPostResponse.data}`;
            },
          },
          duration: 10000,
        });
        setButtonText("Create another post");
        setIsLoading(false);
      }
      if (createPostResponse.status === 500) {
        toast.dismiss();
        toast.error("Failed to create post");
        setButtonText("Create post");
        setIsLoading(false);
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error(`Failed to create post`);
      setButtonText("Create post");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <main className="max-w-7xl mx-auto py-32 flex flex-col gap-10">
      {isClient && (
        <>
          <h1 className="text-center text-5xl">Create a new post</h1>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Crate new post</CardTitle>
              <CardDescription>
                Your post will be automatically published to Sanity
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label>Choose your author</Label>
                <RadioGroup
                  defaultValue={authors[0]._id}
                  className="md:grid flex flex-col grid-cols-3"
                >
                  {authors.map((author) => (
                    <div
                      key={author._id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={author._id}
                        id={author._id}
                        className="hidden"
                        onClick={() => setSelectedAuthorId(author._id)}
                      />

                      <Label
                        className={`cursor-pointer h-full`}
                        htmlFor={author._id}
                      >
                        <Card
                          className={`${selectedAuthorId === author._id ? "border-primary" : "border-secondary"} h-full`}
                        >
                          <CardHeader className="flex flex-row items-center gap-3">
                            <Image
                              src={author.avatar}
                              alt={author.alt}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <CardTitle>{author.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="leading-5">
                            {author.writingStyle}
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="imageKeywords">Image Keywords</Label>
                <Input
                  onChange={(e) => setImageKeywords(e.target.value)}
                  id="imageKeywords"
                  placeholder="Enter image keywords"
                />
              </div>
              <div className="grid w-full  items-center gap-2">
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
        </>
      )}
    </main>
  );
}
