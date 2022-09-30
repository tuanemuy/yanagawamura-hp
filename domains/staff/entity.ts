import { Post, Media } from "lib/graphql";
import { getValueOfField } from "lib/cms";

export type { Tag, Category } from "lib/graphql";

type GenerateStaffVariables = {
  id: number;
  title: string;
  catchPhrase: string;
  message: string;
  keyVisual: Media;
};

export class Staff {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly catchPhrase: string,
    public readonly message: string,
    public readonly keyVisual: Media
  ) {}

  static generate({
    id,
    title,
    catchPhrase,
    message,
    keyVisual,
  }: GenerateStaffVariables): Staff {
    return new Staff(id, title, catchPhrase, message, keyVisual);
  }

  static fromPost(post: Post): Staff {
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const catchPhrase = getValueOfField(post, "catch")?.text?.body;
    const message = getValueOfField(post, "message")?.text?.body;

    if (!keyVisual || !catchPhrase || !message) {
      throw new Error("Failed to generate Staff from Post.");
    }

    return Staff.generate({
      id: post.id,
      title: post.title,
      catchPhrase,
      message,
      keyVisual,
    });
  }
}
