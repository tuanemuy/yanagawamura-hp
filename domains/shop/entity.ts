import { Post, Media, Category, Tag, Value } from "lib/graphql";
import {
  getTags,
  getUpdatedAt,
  getValueOfField,
  getValuesOfField,
} from "lib/cms";

export type { Tag, Category } from "lib/graphql";

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
    public readonly updatedAt: Date
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
      updatedAt
    );
  }

  static fromPost(post: Post): Menu {
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const overview = getValueOfField(post, "overview")?.text?.body;
    const details = getValueOfField(post, "details")?.text?.body;
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (!keyVisual || !updatedAt) {
      throw new Error("Failed to generate Shop from Post.");
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

type GenerateStaffVariables = {
  id: number;
  title: string;
  message?: string;
  keyVisual?: Media;
};

export class Staff {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly message: string | null,
    public readonly keyVisual: Media | null
  ) {}

  static generate({
    id,
    title,
    message,
    keyVisual,
  }: GenerateStaffVariables): Staff {
    return new Staff(id, title, message || null, keyVisual || null);
  }

  static fromPost(post: Post): Staff {
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const message = getValueOfField(post, "message")?.text?.body;

    return Staff.generate({
      id: post.id,
      title: post.title,
      message,
      keyVisual,
    });
  }
}

type GenerateShopVariables = {
  id: number;
  title: string;
  address: string;
  hours: string;
  holidays: string;
  keyVisual: Media;
  overview?: string;
  details: string;
  gallery?: Media[];
  menu?: Menu[];
  staff?: Staff[];
  googleMap?: string;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export class Shop {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly address: string,
    public readonly hours: string,
    public readonly holidays: string,
    public readonly keyVisual: Media,
    public readonly overview: string | null,
    public readonly details: string,
    public readonly gallery: Media[],
    public readonly menu: Menu[],
    public readonly staff: Staff[],
    public readonly googleMap: string | null,
    public readonly category: Category,
    public readonly tags: Tag[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static generate({
    id,
    title,
    address,
    hours,
    holidays,
    keyVisual,
    overview,
    details,
    gallery,
    menu,
    staff,
    googleMap,
    category,
    tags,
    createdAt,
    updatedAt,
  }: GenerateShopVariables): Shop {
    return new Shop(
      id,
      title,
      address,
      hours,
      holidays,
      keyVisual,
      overview || null,
      details,
      gallery || [],
      menu || [],
      staff || [],
      googleMap || null,
      category,
      tags,
      createdAt,
      updatedAt
    );
  }

  static fromPost(post: Post): Shop {
    const address = getValueOfField(post, "address")?.text?.body;
    const hours = getValueOfField(post, "hours")?.text?.body;
    const holidays = getValueOfField(post, "holidays")?.text?.body;
    const keyVisual = getValueOfField(post, "key_visual")?.media?.body;
    const overview = getValueOfField(post, "overview")?.text?.body;
    const details = getValueOfField(post, "details")?.text?.body;

    const gallery = (getValuesOfField(post, "gallery") || [])
      .map((v: Value) => v.media?.body || null)
      .filter((m: Media | null): m is Media => m !== null);

    const menu = (getValuesOfField(post, "menu") || [])
      .map((v: Value) => v.post?.body || null)
      .map((p: Post | null) => {
        if (!p) {
          return null;
        }

        try {
          return Menu.fromPost(p);
        } catch {
          return null;
        }
      })
      .filter((m: Menu | null): m is Menu => m !== null);

    const staff = (getValuesOfField(post, "staff") || [])
      .map((v: Value) => v.post?.body || null)
      .map((p: Post | null) => {
        if (!p) {
          return null;
        }

        try {
          return Staff.fromPost(p);
        } catch {
          return null;
        }
      })
      .filter((s: Staff | null): s is Staff => s !== null);

    const googleMap = getValueOfField(post, "google_map")?.text?.body;
    const tags = getTags(post) || [];
    const updatedAt = getUpdatedAt(post);

    if (
      !address ||
      !hours ||
      !holidays ||
      !keyVisual ||
      !details ||
      !updatedAt
    ) {
      throw new Error("Failed to generate Shop from Post.");
    }

    return Shop.generate({
      id: post.id,
      title: post.title,
      address,
      hours,
      holidays,
      keyVisual,
      overview,
      details,
      gallery,
      menu,
      staff,
      googleMap,
      category: post.category,
      tags,
      createdAt: new Date(post.created_at),
      updatedAt,
    });
  }
}
