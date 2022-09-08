import { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import {
  Order_By,
  Post,
  GetPostQuery,
  GetPostsQuery,
  graphQLClient,
  useGetPostsQuery,
  useGetPostQuery,
} from "lib/graphql";
import { Shop } from "./";
import { InputMaybe, Post_Order_By } from "lib/graphql";

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
    options
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
