import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, Panel } from "components/container";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
import { SimplePagination } from "components/pagination";
import { Link as RestaurantLink } from "domains/restaurant";
import { Link as ShopLink } from "domains/shop";
import { Link as EventLink } from "domains/event";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  Restaurant,
  Category,
  Tag,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { StoreContext } from "providers";
import { url } from "lib/util";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];
  const limit = 9;

  const categoriesResult = fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/category?post_type=restaurant`
  );
  const tagsResult = fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/tag`);

  const results = await Promise.all([categoriesResult, tagsResult]);
  const categories = await results[0].json();
  const tags = await results[1].json();

  const categoryIds = categories.category.map((v: any) => v.id);
  const tagIds = tags.tag.map((v: any) => v.id);

  const getRestaurantsPrefetcher = getGetRestaurantsPrefetcher({
    limit,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getRestaurantsPrefetcher.key,
      getRestaurantsPrefetcher.fetcher
    )
  );

  const getShopsPrefetcher = getGetShopsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getShopsPrefetcher.key,
      getShopsPrefetcher.fetcher
    )
  );

  const getEventsPrefetcher = getGetEventsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getEventsPrefetcher.key,
      getEventsPrefetcher.fetcher
    )
  );

  await Promise.all(prefetches);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      limit,
      allCategories: categories.category,
      allTags: tags.tag,
    },
    revalidate: 60,
  };
}

type Props = {
  limit: number;
  allCategories: Category[];
  allTags: Tag[];
};

const RestaurantArchivePage: NextPage<Props> = ({
  limit,
  allCategories,
  allTags,
}) => {
  const router = useRouter();
  const { page, category, tag } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? parseInt(page[0] || "1", 10) || 1
    : parseInt(page || "1", 10) || 1;
  const categoryId: number | null = Array.isArray(category)
    ? parseInt(category[0] || "", 10) || null
    : parseInt(category || "", 10) || null;
  const tagId: number | null = Array.isArray(tag)
    ? parseInt(tag[0] || "", 10) || null
    : parseInt(tag || "", 10) || null;

  const store = useContext(StoreContext);

  const getInitialRestaurants = useGetRestaurants({
    limit,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  const getRestaurants = useGetRestaurants({
    limit,
    offset: limit * (pageNumber - 1),
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
    options: {
      enabled: pageNumber !== 1,
    },
  });

  const totalPages =
    pageNumber === 1
      ? Math.ceil((getInitialRestaurants.count || 0) / limit)
      : Math.ceil((getRestaurants.count || 0) / limit);

  const { shops } = useGetShops({
    limit: 3,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  const { events } = useGetEvents({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  useEffect(() => {
    store.busy.setIsBusy(
      !getRestaurants.restaurants && getRestaurants.isFetching
    );
  }, [getRestaurants.restaurants, getRestaurants.isFetching]);

  return (
    <Page
      title="飲食店 | 群馬県高崎市の飲み屋街「ヤナガワ村」"
      description="ヤナガワ村"
      path="/restaurant"
      ogType="article"
      header={<Header title="飲食店 | 群馬県高崎市の飲み屋街「ヤナガワ村」" />}
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="飲食店" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
                {(pageNumber === 1
                  ? getInitialRestaurants.restaurants
                  : getRestaurants.restaurants
                ).map((r: Restaurant, index: number) => {
                  return (
                    <RestaurantLink
                      key={r.id}
                      restaurant={r}
                      className={`inview inview__scale0010 inview__delay${
                        (index % 3) + 1
                      }`}
                    />
                  );
                })}
              </Columns>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <SimplePagination
                page={pageNumber}
                totalPages={totalPages}
                setPage={(page: number) => {
                  router.push(`/restaurant?page=${page}`);
                }}
              />
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="thin" wrap isSection>
          <Panel>a</Panel>
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} />
            ))}
            more={url("shop")}
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="一緒に盛り上がろう！"
            items={events.map((e: Event) => (
              <EventLink event={e} />
            ))}
            more={url("event")}
            reverse
          />
        </Stacked>

        <Stacked wrap isSection>
          <Villager />
        </Stacked>
      </Main>
    </Page>
  );
};

export default RestaurantArchivePage;
