import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, Panel } from "components/container";
import { ToCategories, ToTags } from "components/button";
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
  useGetTaggedEvents,
  getGetTaggedEventsPrefetcher,
  useGetCategories,
  getGetCategoriesPrefetcher,
  useGetTags,
  getGetTagsPrefetcher,
} from "domains/event";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { StoreContext } from "providers";
import { url } from "lib/util";

export async function getStaticPaths() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/tag`);
  const data = await result.json();

  return {
    paths: data.tag.map((t: any) => ({ params: { id: t.id.toString() } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const queryClient = new QueryClient();
  const prefetches = [];
  const limit = 9;

  const id = parseInt(params.id, 10) || 0;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/tag/${id}`
  );
  const tag = await result.json();

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const getTaggedEventsPrefetcher = getGetTaggedEventsPrefetcher({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getTaggedEventsPrefetcher.key,
      getTaggedEventsPrefetcher.fetcher
    )
  );

  const getRestaurantsPrefetcher = getGetRestaurantsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
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
    orderBy: { title: Order_By.Asc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getShopsPrefetcher.key,
      getShopsPrefetcher.fetcher
    )
  );

  const getCategoriesPrefetcher = getGetCategoriesPrefetcher();
  prefetches.push(
    queryClient.prefetchQuery(
      getCategoriesPrefetcher.key,
      getCategoriesPrefetcher.fetcher
    )
  );

  const getTagsPrefetcher = getGetTagsPrefetcher();
  prefetches.push(
    queryClient.prefetchQuery(getTagsPrefetcher.key, getTagsPrefetcher.fetcher)
  );

  await Promise.all(prefetches);

  return {
    props: {
      id,
      tagName: tag.tag_by_pk?.name || "",
      dehydratedState: dehydrate(queryClient),
      limit,
    },
    revalidate: 60,
  };
}

type Props = {
  id: number;
  tagName: string;
  limit: number;
};

const TaggedEventsPage: NextPage<Props> = ({ id, tagName, limit }) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? parseInt(page[0] || "1", 10) || 1
    : parseInt(page || "1", 10) || 1;

  const store = useContext(StoreContext);

  const getInitialTaggedEvents = useGetTaggedEvents({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });

  const getTaggedEvents = useGetTaggedEvents({
    tagId: id,
    limit,
    offset: limit * (pageNumber - 1),
    orderBy: { post: { created_at: Order_By.Desc } },
    options: {
      enabled: pageNumber !== 1,
    },
  });

  const totalPages =
    pageNumber === 1
      ? Math.ceil((getInitialTaggedEvents.count || 0) / limit)
      : Math.ceil((getTaggedEvents.count || 0) / limit);

  const { restaurants } = useGetRestaurants({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
  });

  const { shops } = useGetShops({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
  });

  const { categories } = useGetCategories();

  const { tags } = useGetTags();

  useEffect(() => {
    store.busy.setIsBusy(
      !getTaggedEvents.taggedEvents && getTaggedEvents.isFetching
    );
  }, [getTaggedEvents.taggedEvents, getTaggedEvents.isFetching]);

  return (
    <Page
      title={`#${
        tagName || ""
      } のイベント | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街`}
      description={`「${
        tagName || ""
      }」タグのヤナガワ村のイベント情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」では、お子さまからご高齢の方まで、男女問わず楽しんでいただけるイベントを開催しています。その最新情報をお届けします。`}
      path={`event/tag/${id}`}
      ogType="article"
      header={
        <Header
          title={`#${
            tagName || ""
          } のイベント | 群馬県高崎市の飲み屋街【ヤナガワ村】`}
        />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title={`#${tagName} のイベント`} />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
              {(pageNumber === 1
                ? getInitialTaggedEvents.taggedEvents
                : getTaggedEvents.taggedEvents
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

            <Stacked paddingPos="top" paddingSize="thin">
              <SimplePagination
                page={pageNumber}
                totalPages={totalPages}
                setPage={(page: number) => {
                  router.push(`/event/tag/${id}?page=${page}`);
                }}
              />
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="thin" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <PlainText>
                <h3>カテゴリーで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToCategories postType="event" categories={categories} />
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h3>タグで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToTags postType="event" tags={tags} selected={id} />
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="飲食店"
            subtitle="笑顔でお待ちしております！"
            items={restaurants.map((r: Restaurant) => (
              <RestaurantLink restaurant={r} key={r.id} />
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
              <ShopLink shop={s} key={s.id} />
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

export default TaggedEventsPage;
