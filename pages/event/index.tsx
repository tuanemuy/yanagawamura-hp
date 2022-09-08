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
  Event,
  Category,
  Tag,
  useGetEvents,
  getGetEventsPrefetcher,
} from "domains/event";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { StoreContext } from "providers";
import { url } from "lib/util";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];
  const limit = 9;

  const categoriesResult = fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/category?post_type=event`
  );
  const tagsResult = fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/tag`);

  const results = await Promise.all([categoriesResult, tagsResult]);
  const categories = await results[0].json();
  const tags = await results[1].json();

  const categoryIds = categories.category.map((v: any) => v.id);
  const tagIds = tags.tag.map((v: any) => v.id);

  const getEventsPrefetcher = getGetEventsPrefetcher({
    limit,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getEventsPrefetcher.key,
      getEventsPrefetcher.fetcher
    )
  );

  const getRestaurantsPrefetcher = getGetRestaurantsPrefetcher({
    limit: 3,
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

const EventArchivePage: NextPage<Props> = ({
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

  const getInitialEvents = useGetEvents({
    limit,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  const getEvents = useGetEvents({
    limit,
    offset: limit * (pageNumber - 1),
    orderBy: { created_at: Order_By.Desc },
    options: {
      enabled: pageNumber !== 1,
    },
  });

  const totalPages =
    pageNumber === 1
      ? Math.ceil((getInitialEvents.count || 0) / limit)
      : Math.ceil((getEvents.count || 0) / limit);

  const { restaurants } = useGetRestaurants({
    limit: 3,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  const { shops } = useGetShops({
    limit: 3,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  useEffect(() => {
    store.busy.setIsBusy(!getEvents.events && getEvents.isFetching);
  }, [getEvents.events, getEvents.isFetching]);

  return (
    <Page
      title="イベント | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村のイベント情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」では、お子さまからご高齢の方まで、男女問わず楽しんでいただけるイベントを開催しています。その最新情報をお届けします。"
      path="/event"
      ogType="article"
      header={
        <Header title="イベント | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="イベント" />

        <Stacked paddingPos="top" paddingSize="thin" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
                {(pageNumber === 1
                  ? getInitialEvents.events
                  : getEvents.events
                ).map((e: Event, index: number) => {
                  return (
                    <EventLink
                      key={e.id}
                      event={e}
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
                  router.push(`/news?page=${page}`);
                }}
              />
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>a</Panel>
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="飲食店"
            subtitle="笑顔でお待ちしております！"
            items={restaurants.map((r: Restaurant) => (
              <RestaurantLink restaurant={r} />
            ))}
            more={url("restaurant")}
            reverse
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} />
            ))}
            more={url("shop")}
          />
        </Stacked>

        <Stacked wrap isSection>
          <Villager />
        </Stacked>
      </Main>
    </Page>
  );
};

export default EventArchivePage;
