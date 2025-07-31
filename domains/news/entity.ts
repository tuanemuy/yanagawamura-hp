import { getTags, getUpdatedAt, getValueOfField } from "lib/cms";
import type { Category, Post, Tag } from "lib/graphql";

export type { Category, Tag } from "lib/graphql";

type GenerateNewsVariables = {
  id: number;
  title: string;
  body: string;
  slug: string;
  overview: string;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class News {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly body: string,
    public readonly slug: string,
    public readonly overview: string | null,
    public readonly category: Category,
    public readonly tags: Tag[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static generate({
    id,
    title,
    body,
    slug,
    overview,
    category,
    tags,
    createdAt,
    updatedAt,
  }: GenerateNewsVariables): News {
    return new News(
      id,
      title,
      body,
      slug,
      overview,
      category,
      tags,
      createdAt,
      updatedAt,
    );
  }

  static fromPost(post: Post): News {
    const body = getValueOfField(post, "body")?.text?.body;
    const slug = getValueOfField(post, "slug")?.text?.body;
    const overview = getValueOfField(post, "overview")?.text?.body || "";
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (!body || !slug || !updatedAt) {
      throw new Error("Failed to generate News from Post.");
    }

    return News.generate({
      id: post.id,
      body,
      title: post.title,
      slug,
      overview,
      category: post.category,
      tags,
      createdAt: new Date(post.created_at),
      updatedAt,
    });
  }
}
