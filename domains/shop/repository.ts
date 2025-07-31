import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
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
import { Shop } from "./";

type GetShopVariables = {
  id: number;
  options?: UseQueryOptions<GetPostQuery, unknown, GetPostQuery, QueryKey>;
};

export function getGetShopPrefetcher({ id }: GetShopVariables) {
  const key = useGetPostQuery.getKey({ id });
  const fetcher = useGetPostQuery.fetcher(graphQLClient, { id });

  return {
    key,
    fetcher,
  };
}

export function useGetShop({ id, options }: GetShopVariables) {
  const getShop = useGetPostQuery(graphQLClient, { id }, options);
  const shop = getShop.data?.post_by_pk
    ? Shop.fromPost(getShop.data.post_by_pk as Post)
    : null;

  return {
    isFetching: getShop.isFetching,
    shop,
  };
}

type GetShopsVariables = {
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey>;
};

export function getGetShopsPrefetcher({
  limit,
  offset,
  orderBy,
}: GetShopsVariables) {
  const key = useGetPostsQuery.getKey({
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetShops({
  limit,
  offset,
  orderBy,
  options,
}: GetShopsVariables) {
  const getShops = useGetPostsQuery(
    graphQLClient,
    {
      post_type_slug: ["shop"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const shops = ((getShops.data?.post as Post[]) || [])
    .map((p: Post) => {
      try {
        return Shop.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Shop | null): item is Shop => item !== null);

  return {
    isFetching: getShops.isFetching,
    shops,
    count: getShops.data?.post_aggregate.aggregate?.count || 0,
  };
}

type GetTaggedShopsVariables = {
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

export function getGetTaggedShopsPrefetcher({
  tagId,
  limit,
  offset,
  orderBy,
}: GetTaggedShopsVariables) {
  const key = useGetTaggedPostsQuery.getKey({
    tag_id: tagId,
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  const fetcher = useGetTaggedPostsQuery.fetcher(graphQLClient, {
    tag_id: tagId,
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetTaggedShops({
  tagId,
  limit,
  offset,
  orderBy,
  options,
}: GetTaggedShopsVariables) {
  const getTaggedShops = useGetTaggedPostsQuery(
    graphQLClient,
    {
      tag_id: tagId,
      post_type_slug: ["shop"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { post: { created_at: Order_By.Desc } },
    },
    options,
  );

  const taggedShops = (
    (getTaggedShops.data?.tag_by_pk?.posts as Post_Tag[]) || []
  )
    .map((pt: Post_Tag) => {
      try {
        return Shop.fromPost(pt.post);
      } catch {
        return null;
      }
    })
    .filter((item: Shop | null): item is Shop => item !== null);

  return {
    isFetching: getTaggedShops.isFetching,
    taggedShops,
    count:
      getTaggedShops.data?.tag_by_pk?.posts_aggregate.aggregate?.count || 0,
  };
}

type GetCategorizedShopsVariables = {
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

export function getGetCategorizedShopsPrefetcher({
  categoryId,
  limit,
  offset,
  orderBy,
}: GetCategorizedShopsVariables) {
  const key = useGetCategorizedPostsQuery.getKey({
    category_id: categoryId,
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetCategorizedPostsQuery.fetcher(graphQLClient, {
    category_id: categoryId,
    post_type_slug: ["shop"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategorizedShops({
  categoryId,
  limit,
  offset,
  orderBy,
  options,
}: GetCategorizedShopsVariables) {
  const getCategorizedShops = useGetCategorizedPostsQuery(
    graphQLClient,
    {
      category_id: categoryId,
      post_type_slug: ["shop"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const categorizedShops = (
    (getCategorizedShops.data?.category_by_pk?.posts as Post[]) || []
  )
    .map((p: Post) => {
      try {
        return Shop.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Shop | null): item is Shop => item !== null);

  return {
    isFetching: getCategorizedShops.isFetching,
    categorizedShops,
    count:
      getCategorizedShops.data?.category_by_pk?.posts_aggregate.aggregate
        ?.count || 0,
  };
}

export function getGetCategoriesPrefetcher() {
  const key = useGetCategoriesQuery.getKey({
    post_type_slug: ["shop"],
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["shop"],
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategories() {
  const getCategories = useGetCategoriesQuery(graphQLClient, {
    post_type_slug: ["shop"],
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
