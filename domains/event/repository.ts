import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { Event } from "domains/event";
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
    options,
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

type GetTaggedEventsVariables = {
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

export function getGetTaggedEventsPrefetcher({
  tagId,
  limit,
  offset,
  orderBy,
}: GetTaggedEventsVariables) {
  const key = useGetTaggedPostsQuery.getKey({
    tag_id: tagId,
    post_type_slug: ["event"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  const fetcher = useGetTaggedPostsQuery.fetcher(graphQLClient, {
    tag_id: tagId,
    post_type_slug: ["event"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetTaggedEvents({
  tagId,
  limit,
  offset,
  orderBy,
  options,
}: GetTaggedEventsVariables) {
  const getTaggedEvents = useGetTaggedPostsQuery(
    graphQLClient,
    {
      tag_id: tagId,
      post_type_slug: ["event"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { post: { created_at: Order_By.Desc } },
    },
    options,
  );

  const taggedEvents = (
    (getTaggedEvents.data?.tag_by_pk?.posts as Post_Tag[]) || []
  )
    .map((pt: Post_Tag) => {
      try {
        return Event.fromPost(pt.post);
      } catch {
        return null;
      }
    })
    .filter((item: Event | null): item is Event => item !== null);

  return {
    isFetching: getTaggedEvents.isFetching,
    taggedEvents,
    count:
      getTaggedEvents.data?.tag_by_pk?.posts_aggregate.aggregate?.count || 0,
  };
}

type GetCategorizedEventsVariables = {
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

export function getGetCategorizedEventsPrefetcher({
  categoryId,
  limit,
  offset,
  orderBy,
}: GetCategorizedEventsVariables) {
  const key = useGetCategorizedPostsQuery.getKey({
    category_id: categoryId,
    post_type_slug: ["event"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetCategorizedPostsQuery.fetcher(graphQLClient, {
    category_id: categoryId,
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

export function useGetCategorizedEvents({
  categoryId,
  limit,
  offset,
  orderBy,
  options,
}: GetCategorizedEventsVariables) {
  const getCategorizedEvents = useGetCategorizedPostsQuery(
    graphQLClient,
    {
      category_id: categoryId,
      post_type_slug: ["event"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options,
  );

  const categorizedEvents = (
    (getCategorizedEvents.data?.category_by_pk?.posts as Post[]) || []
  )
    .map((p: Post) => {
      try {
        return Event.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Event | null): item is Event => item !== null);

  return {
    isFetching: getCategorizedEvents.isFetching,
    categorizedEvents,
    count:
      getCategorizedEvents.data?.category_by_pk?.posts_aggregate.aggregate
        ?.count || 0,
  };
}

export function getGetCategoriesPrefetcher() {
  const key = useGetCategoriesQuery.getKey({
    post_type_slug: ["event"],
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["event"],
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategories() {
  const getCategories = useGetCategoriesQuery(graphQLClient, {
    post_type_slug: ["event"],
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
