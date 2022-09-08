import { Post, Value, Category, Content_Tag, Tag } from "lib/graphql";

export function getTitle(post: Post): string | null {
  if (post.contents.length < 1) {
    return null;
  }

  return post.contents[0].title;
}

export function getUpdatedAt(post: Post): Date | null {
  if (post.contents.length < 1) {
    return null;
  }

  return new Date(post.contents[0].created_at);
}

export function getCategory(post: Post): Category | null {
  if (post.contents.length < 1) {
    return null;
  }

  return post.contents[0].category;
}

export function getTags(post: Post): Tag[] | null {
  if (post.contents.length < 1) {
    return null;
  }

  return post.contents[0].tags.map((ct: Content_Tag) => ct.tag);
}

export function getValueOfField(post: Post, slug: string): Value | null {
  if (post.contents.length < 1) {
    return null;
  }

  return (
    (post.contents[0].values || []).filter(
      (v: Value) => v.field.slug === slug
    )[0] || null
  );
}

export function getValuesOfField(post: Post, slug: string): Value[] | null {
  if (post.contents.length < 1) {
    return null;
  }

  return (post.contents[0].values || []).filter(
    (v: Value) => v.field.slug === slug
  );
}
