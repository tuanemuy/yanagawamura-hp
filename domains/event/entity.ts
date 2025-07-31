import { getTags, getUpdatedAt, getValueOfField } from "lib/cms";
import type { Category, Media, Post, Tag } from "lib/graphql";

export type { Category, Media, Tag } from "lib/graphql";

type GenerateEventVariables = {
  id: number;
  title: string;
  overview?: string;
  schedule: string;
  location: string;
  keyVisual: Media;
  details: string;
  googleMap?: string;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class Event {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly overview: string | null,
    public readonly schedule: string,
    public readonly location: string,
    public readonly keyVisual: Media,
    public readonly details: string,
    public readonly googleMap: string | null,
    public readonly category: Category,
    public readonly tags: Tag[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static generate({
    id,
    title,
    overview,
    schedule,
    location,
    keyVisual,
    details,
    googleMap,
    category,
    tags,
    createdAt,
    updatedAt,
  }: GenerateEventVariables): Event {
    return new Event(
      id,
      title,
      overview || null,
      schedule,
      location,
      keyVisual,
      details,
      googleMap || null,
      category,
      tags,
      createdAt,
      updatedAt,
    );
  }

  static fromPost(post: Post): Event {
    const overview = getValueOfField(post, "overview")?.text?.body;
    const schedule = getValueOfField(post, "schedule")?.text?.body;
    const location = getValueOfField(post, "location")?.text?.body;
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const details = getValueOfField(post, "details")?.text?.body;
    const googleMap = getValueOfField(post, "google_map")?.text?.body;
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (!schedule || !location || !keyVisual || !details || !updatedAt) {
      throw new Error("Failed to generate Restaurant from Post.");
    }

    return Event.generate({
      id: post.id,
      title: post.title,
      overview,
      schedule,
      location,
      keyVisual,
      details,
      googleMap,
      category: post.category,
      tags,
      createdAt: new Date(post.created_at),
      updatedAt,
    });
  }
}
