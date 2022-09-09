import { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import {
  Order_By,
  Post,
  Post_Tag,
  Category,
  Tag,
  GetPostQuery,
  GetPostsQuery,
  GetTaggedPostsQuery,
  GetCategorizedPostsQuery,
  graphQLClient,
  useGetPostsQuery,
  useGetPostQuery,
  useGetTaggedPostsQuery,
  useGetCategorizedPostsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "lib/graphql";
import { Restaurant } from "domains/restaurant";
import { InputMaybe, Post_Order_By, Post_Tag_Order_By } from "lib/graphql";

type GetRestaurantVariables = {
  id: number;
  options?: UseQueryOptions<GetPostQuery, unknown, GetPostQuery, QueryKey>;
};

export function getGetRestaurantPrefetcher({ id }: GetRestaurantVariables) {
  const key = useGetPostQuery.getKey({ id });
  const fetcher = useGetPostQuery.fetcher(graphQLClient, { id });

  return {
    key,
    fetcher,
  };
}

export function useGetRestaurant({ id, options }: GetRestaurantVariables) {
  const getRestaurant = useGetPostQuery(graphQLClient, { id }, options);
  const restaurant = getRestaurant.data?.post_by_pk
    ? Restaurant.fromPost(getRestaurant.data.post_by_pk as Post)
    : null;

  return {
    isFetching: getRestaurant.isFetching,
    restaurant,
  };
}

type GetRestaurantsVariables = {
  limit?: number;
  offset?: number;
  orderBy?: InputMaybe<Post_Order_By[] | Post_Order_By>;
  options?: UseQueryOptions<GetPostsQuery, unknown, GetPostsQuery, QueryKey>;
};

export function getGetRestaurantsPrefetcher({
  limit,
  offset,
  orderBy,
}: GetRestaurantsVariables) {
  const key = useGetPostsQuery.getKey({
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetRestaurants({
  limit,
  offset,
  orderBy,
  options,
}: GetRestaurantsVariables) {
  const getRestaurants = useGetPostsQuery(
    graphQLClient,
    {
      post_type_slug: ["restaurant"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options
  );

  const restaurants = ((getRestaurants.data?.post as Post[]) || [])
    .map((p: Post) => {
      try {
        return Restaurant.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Restaurant | null): item is Restaurant => item !== null);

  return {
    isFetching: getRestaurants.isFetching,
    restaurants,
    count: getRestaurants.data?.post_aggregate.aggregate?.count || 0,
  };
}

type GetTaggedRestaurantsVariables = {
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

export function getGetTaggedRestaurantsPrefetcher({
  tagId,
  limit,
  offset,
  orderBy,
}: GetTaggedRestaurantsVariables) {
  const key = useGetTaggedPostsQuery.getKey({
    tag_id: tagId,
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  const fetcher = useGetTaggedPostsQuery.fetcher(graphQLClient, {
    tag_id: tagId,
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { post: { created_at: Order_By.Desc } },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetTaggedRestaurants({
  tagId,
  limit,
  offset,
  orderBy,
  options,
}: GetTaggedRestaurantsVariables) {
  const getTaggedRestaurants = useGetTaggedPostsQuery(
    graphQLClient,
    {
      tag_id: tagId,
      post_type_slug: ["restaurant"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { post: { created_at: Order_By.Desc } },
    },
    options
  );

  const taggedRestaurants = (
    (getTaggedRestaurants.data?.tag_by_pk?.posts as Post_Tag[]) || []
  )
    .map((pt: Post_Tag) => {
      try {
        return Restaurant.fromPost(pt.post);
      } catch {
        return null;
      }
    })
    .filter((item: Restaurant | null): item is Restaurant => item !== null);

  return {
    isFetching: getTaggedRestaurants.isFetching,
    taggedRestaurants,
    count:
      getTaggedRestaurants.data?.tag_by_pk?.posts_aggregate.aggregate?.count ||
      0,
  };
}

type GetCategorizedRestaurantsVariables = {
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

export function getGetCategorizedRestaurantsPrefetcher({
  categoryId,
  limit,
  offset,
  orderBy,
}: GetCategorizedRestaurantsVariables) {
  const key = useGetCategorizedPostsQuery.getKey({
    category_id: categoryId,
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  const fetcher = useGetCategorizedPostsQuery.fetcher(graphQLClient, {
    category_id: categoryId,
    post_type_slug: ["restaurant"],
    limit: limit || 9,
    offset: offset || 0,
    order_by: orderBy || { created_at: Order_By.Desc },
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategorizedRestaurants({
  categoryId,
  limit,
  offset,
  orderBy,
  options,
}: GetCategorizedRestaurantsVariables) {
  const getCategorizedRestaurants = useGetCategorizedPostsQuery(
    graphQLClient,
    {
      category_id: categoryId,
      post_type_slug: ["restaurant"],
      limit: limit || 9,
      offset: offset || 0,
      order_by: orderBy || { created_at: Order_By.Desc },
    },
    options
  );

  const categorizedRestaurants = (
    (getCategorizedRestaurants.data?.category_by_pk?.posts as Post[]) || []
  )
    .map((p: Post) => {
      try {
        return Restaurant.fromPost(p);
      } catch {
        return null;
      }
    })
    .filter((item: Restaurant | null): item is Restaurant => item !== null);

  return {
    isFetching: getCategorizedRestaurants.isFetching,
    categorizedRestaurants,
    count:
      getCategorizedRestaurants.data?.category_by_pk?.posts_aggregate.aggregate
        ?.count || 0,
  };
}

export function getGetCategoriesPrefetcher() {
  const key = useGetCategoriesQuery.getKey({
    post_type_slug: ["restaurant"],
  });

  const fetcher = useGetPostsQuery.fetcher(graphQLClient, {
    post_type_slug: ["restaurant"],
  });

  return {
    key,
    fetcher,
  };
}

export function useGetCategories() {
  const getCategories = useGetCategoriesQuery(graphQLClient, {
    post_type_slug: ["restaurant"],
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
