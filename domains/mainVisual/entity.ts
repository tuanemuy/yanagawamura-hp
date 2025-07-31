import { getValueOfField } from "lib/cms";
import type { Media, Post } from "lib/graphql";

type GenerateMainVisualVariables = {
  id: number;
  title: string;
  url: string;
  image: Media;
  mobileImage: Media;
  priority: number;
};

export class MainVisual {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly url: string,
    public readonly image: Media,
    public readonly mobileImage: Media,
    public readonly priority: number,
  ) {}

  static generate({
    id,
    title,
    url,
    image,
    mobileImage,
    priority,
  }: GenerateMainVisualVariables): MainVisual {
    return new MainVisual(id, title, url, image, mobileImage, priority);
  }

  static fromPost(post: Post): MainVisual {
    const url = getValueOfField(post, "url")?.text?.body;
    const image = getValueOfField(post, "image")?.media?.body;
    const mobileImage = getValueOfField(post, "image_mobile")?.media?.body;
    const priority = getValueOfField(post, "priority")?.integer?.body;

    if (!url || !image || !mobileImage || !priority) {
      throw new Error("Failed to generate MainVisual from Post.");
    }

    return MainVisual.generate({
      id: post.id,
      title: post.title,
      url,
      image,
      mobileImage,
      priority,
    });
  }
}
