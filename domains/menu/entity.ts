import { getTags, getUpdatedAt, getValueOfField } from "lib/cms";
import type { Category, Media, Post, Tag } from "lib/graphql";

export type { Category, Tag } from "lib/graphql";

type GenerateMenuVariables = {
  id: number;
  title: string;
  keyVisual: Media;
  overview?: string;
  details?: string;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class Menu {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly keyVisual: Media,
    public readonly overview: string | null,
    public readonly details: string | null,
    public readonly category: Category,
    public readonly tags: Tag[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static generate({
    id,
    title,
    keyVisual,
    overview,
    details,
    category,
    tags,
    createdAt,
    updatedAt,
  }: GenerateMenuVariables): Menu {
    return new Menu(
      id,
      title,
      keyVisual,
      overview || null,
      details || null,
      category,
      tags,
      createdAt,
      updatedAt,
    );
  }

  static fromPost(post: Post): Menu {
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const overview = getValueOfField(post, "overview")?.text?.body;
    const details = getValueOfField(post, "details")?.text?.body;
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (!keyVisual || !updatedAt) {
      throw new Error("Failed to generate Restaurant from Post.");
    }

    return Menu.generate({
      id: post.id,
      title: post.title,
      keyVisual,
      overview,
      details,
      category: post.category,
      tags,
      createdAt: new Date(post.created_at),
      updatedAt,
    });
  }
}
