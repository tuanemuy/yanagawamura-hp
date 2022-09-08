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
import { Restaurant } from "domains/restaurant";
import { InputMaybe, Post_Order_By } from "lib/graphql";

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
