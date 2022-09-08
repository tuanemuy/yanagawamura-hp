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
import { Event } from "domains/event";
import { InputMaybe, Post_Order_By } from "lib/graphql";

type GetEventVariables = {
  id: number;
  options?: UseQueryOptions<GetPostQuery, unknown, GetPostQuery, QueryKey>;
};

export function getGetEventPrefetcher({ id }: GetEventVariables) {
  const key = useGetPostQuery.getKey({ id });
  const fetcher = useGetPostQuery.fetcher(graphQLClient, { id });

  return {
    key,
    fetcher,
  };
}

export function useGetEvent({ id, options }: GetEventVariables) {
  const getEvent = useGetPostQuery(graphQLClient, { id });
  const event = getEvent.data?.post_by_pk
    ? Event.fromPost(getEvent.data.post_by_pk as Post)
    : null;

  return {
    isFetching: getEvent.isFetching,
    event,
    options,
  };
}

type GetEventsVariables = {
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey>;
};

export function getGetEventsPrefetcher({
  limit,
  offset,
  orderBy,
}: GetEventsVariables) {
  const key = useGetPostsQuery.getKey({
    post_type_slug: ["event"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["event"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetEvents({
  limit,
  offset,
  orderBy,
  options,
}: GetEventsVariables) {
  const getEvents = useGetPostsQuery(
    graphQLClient,
    {
      post_type_slug: ["event"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options
  );

  const events = ((getEvents.data?.post as Post[]) || [])
    .map((p: Post) => {
      try {
        return Event.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Event | null): item is Event => item !== null);

  return {
    isFetching: getEvents.isFetching,
    events,
    count: getEvents.data?.post_aggregate.aggregate?.count || 0,
  };
}
