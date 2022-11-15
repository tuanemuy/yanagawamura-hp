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
import { Link as ShopLink } from "domains/shop";
import { Link as RestaurantLink } from "domains/restaurant";
import { Link as EventLink } from "domains/event";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  Shop,
  useGetTaggedShops,
  getGetTaggedShopsPrefetcher,
} from "domains/shop";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
  useGetCategories,
  getGetCategoriesPrefetcher,
  useGetTags,
  getGetTagsPrefetcher,
} from "domains/restaurant";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
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

  const getTaggedShopsPrefetcher = getGetTaggedShopsPrefetcher({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getTaggedShopsPrefetcher.key,
      getTaggedShopsPrefetcher.fetcher
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

const TaggedShopsPage: NextPage<Props> = ({ id, tagName, limit }) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? parseInt(page[0] || "1", 10) || 1
    : parseInt(page || "1", 10) || 1;

  const store = useContext(StoreContext);

  const getInitialTaggedShops = useGetTaggedShops({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });

  const getTaggedShops = useGetTaggedShops({
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
      ? Math.ceil((getInitialTaggedShops.count || 0) / limit)
      : Math.ceil((getTaggedShops.count || 0) / limit);

  const { restaurants } = useGetRestaurants({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
  });

  const { events } = useGetEvents({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  const { categories } = useGetCategories();

  const { tags } = useGetTags();

  useEffect(() => {
    store.busy.setIsBusy(
      !getTaggedShops.taggedShops && getTaggedShops.isFetching
    );
  }, [getTaggedShops.taggedShops, getTaggedShops.isFetching]);

  return (
    <Page
      title={`#${
        tagName || ""
      } の物販・サービス店 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街`}
      description={`「${
        tagName || ""
      }」タグのヤナガワ村の物販・サービス店情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、チェーン店はほとんどありません。その代わりに様々な個性溢れる店舗が立ち並びます。昭和の香りが漂うこの街をぜひお楽しみください。`}
      path={`shop/tag/${id}`}
      ogType="article"
      header={
        <Header
          title={`#${
            tagName || ""
          } の物販・サービス店 | 群馬県高崎市の商店街街【ヤナガワ村】`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title={`#${tagName} の物販・サービス店`} />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
              {(pageNumber === 1
                ? getInitialTaggedShops.taggedShops
                : getTaggedShops.taggedShops
              ).map((e: Shop, index: number) => {
                return (
                  <ShopLink
                    key={e.id}
                    shop={e}
                    className={`inview inview__scale0010 inview__delay${
                      index % 3
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
                  router.push(`/shop/tag/${id}?page=${page}`);
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
              <ToCategories postType="shop" categories={categories} />
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h3>タグで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToTags postType="shop" tags={tags} selected={id} />
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
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="一緒に盛り上がろう！"
            items={events.map((e: Event) => (
              <EventLink event={e} key={e.id} />
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

export default TaggedShopsPage;
