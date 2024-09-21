import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "writingStyle",
      title: "Writing Style",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "styleModifier",
      title: "Style Modifier",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
