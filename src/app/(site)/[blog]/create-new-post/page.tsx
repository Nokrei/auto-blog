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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export default function CreateNewPostPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");

  const publishedAt = new Date();
  const content = [
    {
      markDefs: [],
      style: "normal",
      _key: "1",
      _type: "block",
      children: [
        { _type: "span", text: "This is the content of the blog post." },
      ],
    },
    {
      markDefs: [],
      style: "normal",
      _key: "2",
      _type: "block",
      children: [
        { _type: "span", text: "This is the content of the blog post." },
      ],
    },
  ];

  async function handleCreatePostClick() {
    console.log("click");

    await axios.post("/api/create-post", {
      title,
      subtitle,
      summary,
      publishedAt,
      content,
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
        <CardContent>
          <div className="flex gap-10">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="post-title">Post title</Label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="post-title"
                placeholder="My post title"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="post-subtitle">Post subtitle</Label>
              <Input
                onChange={(e) => setSubtitle(e.target.value)}
                type="text"
                id="post-subtitle"
                placeholder="My post subtitle"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="post-summary">Post summary</Label>
              <Input
                onChange={(e) => setSummary(e.target.value)}
                type="text"
                id="post-summary"
                placeholder="My post summary"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleCreatePostClick()} variant="outline">
            Create post
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
