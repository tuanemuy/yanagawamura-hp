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
import { News } from "domains/news";
import { InputMaybe, Post_Order_By } from "lib/graphql";

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
    options
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
