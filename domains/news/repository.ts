import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { News } from "domains/news";
import {
  type Category,
  type GetCategorizedPostsQuery,
  type GetPostQuery,
  type GetPostsQuery,
  type GetTaggedPostsQuery,
  graphQLClient,
  type InputMaybe,
  Order_By,
  type Post,
  type Post_Order_By,
  type Post_Tag,
  type Post_Tag_Order_By,
  type Tag,
  useGetCategoriesQuery,
  useGetCategorizedPostsQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useGetTaggedPostsQuery,
  useGetTagsQuery,
} from "lib/graphql";

type GetNewsVariables = {
  id: number;
  options?: UseQueryOptions<GetPostQuery, unknown, GetPostQuery, QueryKey>;
};

export function getGetNewsPrefetcher({ id }: GetNewsVariables) {
  const key = useGetPostQuery.getKey({ id });
  const fetcher = useGetPostQuery.fetcher(graphQLClient, { id });

  return {
    key,
    fetcher,
  };
}

export function useGetNews({ id, options }: GetNewsVariables) {
  const getNews = useGetPostQuery(graphQLClient, { id }, options);
  const news = getNews.data?.post_by_pk
    ? News.fromPost(getNews.data.post_by_pk as Post)
    : null;

  return {
    isFetching: getNews.isFetching,
    news,
  };
}

type GetNewsArchiveVariables = {
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey>;
};

export function getGetNewsArchivePrefetcher({
  limit,
  offset,
  orderBy,
}: GetNewsArchiveVariables) {
  const key = useGetPostsQuery.getKey({
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetNewsArchive({
  limit,
  offset,
  orderBy,
  options,
}: GetNewsArchiveVariables) {
  const getNewsArchive = useGetPostsQuery(
    graphQLClient,
    {
      post_type_slug: ["news"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const newsArchive = ((getNewsArchive.data?.post as Post[]) || [])
    .map((p: Post) => {
      try {
        return News.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: News | null): item is News => item !== null);

  return {
    isFetching: getNewsArchive.isFetching,
    newsArchive,
    count: getNewsArchive.data?.post_aggregate.aggregate?.count || 0,
  };
}

type GetTaggedNewsArchiveVariables = {
  tagId: number;
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Tag_Order_By[] | Post_Tag_Order_By>;
  options?: UseQueryOptions<
    GetTaggedPostsQuery,
    unknown,
    GetTaggedPostsQuery,
    QueryKey
  >;
};

export function getGetTaggedNewsArchivePrefetcher({
  tagId,
  limit,
  offset,
  orderBy,
}: GetTaggedNewsArchiveVariables) {
  const key = useGetTaggedPostsQuery.getKey({
    tag_id: tagId,
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  const fetcher = useGetTaggedPostsQuery.fetcher(graphQLClient, {
    tag_id: tagId,
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetTaggedNewsArchive({
  tagId,
  limit,
  offset,
  orderBy,
  options,
}: GetTaggedNewsArchiveVariables) {
  const getTaggedNewsArchive = useGetTaggedPostsQuery(
    graphQLClient,
    {
      tag_id: tagId,
      post_type_slug: ["news"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { post: { created_at: Order_By.Desc } },
    },
    options,
  );

  const taggedNewsArchive = (
    (getTaggedNewsArchive.data?.tag_by_pk?.posts as Post_Tag[]) || []
  )
    .map((pt: Post_Tag) => {
      try {
        return News.fromPost(pt.post);
      } catch {
        return null;
      }
    })
    .filter((item: News | null): item is News => item !== null);

  return {
    isFetching: getTaggedNewsArchive.isFetching,
    taggedNewsArchive,
    count:
      getTaggedNewsArchive.data?.tag_by_pk?.posts_aggregate.aggregate?.count ||
      0,
  };
}

type GetCategorizedNewsArchiveVariables = {
  categoryId: number;
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<
    GetCategorizedPostsQuery,
    unknown,
    GetCategorizedPostsQuery,
    QueryKey
  >;
};

export function getGetCategorizedNewsArchivePrefetcher({
  categoryId,
  limit,
  offset,
  orderBy,
}: GetCategorizedNewsArchiveVariables) {
  const key = useGetCategorizedPostsQuery.getKey({
    category_id: categoryId,
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetCategorizedPostsQuery.fetcher(graphQLClient, {
    category_id: categoryId,
    post_type_slug: ["news"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategorizedNewsArchive({
  categoryId,
  limit,
  offset,
  orderBy,
  options,
}: GetCategorizedNewsArchiveVariables) {
  const getCategorizedNewsArchive = useGetCategorizedPostsQuery(
    graphQLClient,
    {
      category_id: categoryId,
      post_type_slug: ["news"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const categorizedNewsArchive = (
    (getCategorizedNewsArchive.data?.category_by_pk?.posts as Post[]) || []
  )
    .map((p: Post) => {
      try {
        return News.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: News | null): item is News => item !== null);

  return {
    isFetching: getCategorizedNewsArchive.isFetching,
    categorizedNewsArchive,
    count:
      getCategorizedNewsArchive.data?.category_by_pk?.posts_aggregate.aggregate
        ?.count || 0,
  };
}

export function getGetCategoriesPrefetcher() {
  const key = useGetCategoriesQuery.getKey({
    post_type_slug: ["news"],
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["news"],
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategories() {
  const getCategories = useGetCategoriesQuery(graphQLClient, {
    post_type_slug: ["news"],
  });

  return {
    isFetching: getCategories.isFetching,
    categories: (getCategories.data?.category as Category[]) || [],
  };
}

export function getGetTagsPrefetcher() {
  const key = useGetTagsQuery.getKey();

  const fetcher = useGetPostsQuery.fetcher(graphQLClient);

  return {
    key,
    fetcher,
  };
}

export function useGetTags() {
  const getTags = useGetTagsQuery(graphQLClient);

  return {
    isFetching: getTags.isFetching,
    tags: (getTags.data?.tag as Tag[]) || [],
  };
}
