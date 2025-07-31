import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { MainVisual } from "domains/mainVisual";
import {
  type GetPostsQuery,
  graphQLClient,
  type InputMaybe,
  Order_By,
  type Post,
  type Post_Order_By,
  useGetPostsQuery,
} from "lib/graphql";

type GetMainVisualsVariables = {
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey>;
};

export function getGetMainVisualsPrefetcher({
  limit,
  offset,
  orderBy,
}: GetMainVisualsVariables) {
  const key = useGetPostsQuery.getKey({
    post_type_slug: ["main_visual"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["main_visual"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetMainVisuals({
  limit,
  offset,
  orderBy,
  options,
}: GetMainVisualsVariables) {
  const getMainVisuals = useGetPostsQuery(
    graphQLClient,
    {
      post_type_slug: ["main_visual"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const mainVisuals = ((getMainVisuals.data?.post as Post[]) || [])
    .map((p: Post) => {
      try {
        return MainVisual.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: MainVisual | null): item is MainVisual => item !== null);

  return {
    isFetching: getMainVisuals.isFetching,
    mainVisuals,
    count: getMainVisuals.data?.post_aggregate.aggregate?.count || 0,
  };
}
