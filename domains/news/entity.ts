import { Post, Category, Tag } from "lib/graphql";
import {
  getTitle,
  getCategory,
  getTags,
  getUpdatedAt,
  getValueOfField,
} from "lib/cms";

export type { Tag, Category } from "lib/graphql";

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
    public readonly updatedAt: Date
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
      updatedAt
    );
  }

  static fromPost(post: Post): News {
    const title = getTitle(post);
    const body = getValueOfField(post, "body")?.text?.body;
    const slug = getValueOfField(post, "slug")?.text?.body;
    const overview = getValueOfField(post, "overview")?.text?.body || "";
    const category = getCategory(post);
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (!title || !body || !slug || !category || !updatedAt) {
      throw new Error("Failed to generate News from Post.");
    }

    return News.generate({
      id: post.id,
      body,
      title,
      slug,
      overview,
      category,
      tags,
      createdAt: new Date(post.created_at),
      updatedAt,
    });
  }
}
