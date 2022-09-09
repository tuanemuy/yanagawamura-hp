import { Post, Value, Post_Tag, Tag } from "lib/graphql";

export function getUpdatedAt(post: Post): Date | null {
  if (post.revisions.length < 1) {
    return null;
  }

  return new Date(post.revisions[0].created_at);
}

export function getTags(post: Post): Tag[] | null {
  return post.tags.map((pt: Post_Tag) => pt.tag);
}

export function getValueOfField(post: Post, slug: string): Value | null {
  if (post.revisions.length < 1) {
    return null;
  }

  return (
    (post.revisions[0].values || []).filter(
      (v: Value) => v.field.slug === slug
    )[0] || null
  );
}

export function getValuesOfField(post: Post, slug: string): Value[] | null {
  if (post.revisions.length < 1) {
    return null;
  }

  return (post.revisions[0].values || []).filter(
    (v: Value) => v.field.slug === slug
  );
}
