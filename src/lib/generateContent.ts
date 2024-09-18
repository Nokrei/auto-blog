import { openai } from "./openAiClient";

export const generateBlogPost = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Make sure to use the right model
      messages: [
        {
          role: "system",
          content: `You will be provided with a prompt to write a blog post.
          Your response needs to be provided in JSON format.
          The content you return MUST be a valid JSON object.
          The JSON object should contain the following properties:
          - title: The title of the blog post
          - subtitle: The subtitle of the blog post
          - summary: A summary of the blog post (max 50 characters)
          - content: content is to be an array of objects, each object representing a block of text in the blog post.
           Each object should have the following properties:
            _key: a unique key.
           sectionTitle: The title of the section
           body: The body of the section.
            The body should be an array of objects, each object containing:
            markDefs: an empty array,
            style: "normal",
            _key: a unique key for the block,
            _type: "block",
            children: an array of objects, each object containing:
            _type: "span",
            text: the text for the block.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content?.trim();

    if (!content) {
      throw new Error("No content generated by AI");
    }

    return content;
  } catch (error) {
    throw new Error(
      `Failed to generate blog post: ${(error as Error).message}`
    );
  }
};
