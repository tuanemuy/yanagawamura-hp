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
  Restaurant,
  useGetTaggedRestaurants,
  getGetTaggedRestaurantsPrefetcher,
  useGetCategories,
  getGetCategoriesPrefetcher,
  useGetTags,
  getGetTagsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
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

  const getTaggedRestaurantsPrefetcher = getGetTaggedRestaurantsPrefetcher({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getTaggedRestaurantsPrefetcher.key,
      getTaggedRestaurantsPrefetcher.fetcher
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

const TaggedRestaurantsPage: NextPage<Props> = ({ id, tagName, limit }) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? parseInt(page[0] || "1", 10) || 1
    : parseInt(page || "1", 10) || 1;

  const store = useContext(StoreContext);

  const getInitialTaggedRestaurants = useGetTaggedRestaurants({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });

  const getTaggedRestaurants = useGetTaggedRestaurants({
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
      ? Math.ceil((getInitialTaggedRestaurants.count || 0) / limit)
      : Math.ceil((getTaggedRestaurants.count || 0) / limit);

  const { shops } = useGetShops({
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
      !getTaggedRestaurants.taggedRestaurants && getTaggedRestaurants.isFetching
    );
  }, [getTaggedRestaurants.taggedRestaurants, getTaggedRestaurants.isFetching]);

  return (
    <Page
      title={`#${
        tagName || ""
      } の飲食店 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街`}
      description={`「${
        tagName || ""
      }」タグのヤナガワ村の飲食店情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、「人」を目当てに飲みに行けるような、温かい飲食店がたくさんあります。昔ながらのディープで笑顔あふれる雰囲気をぜひお楽しみください。`}
      path={`restaurant/tag/${id}`}
      ogType="article"
      header={
        <Header
          title={`#${
            tagName || ""
          } の飲食店 | 群馬県高崎市の飲み屋街【ヤナガワ村】`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title={`#${tagName} の飲食店`} />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
              {(pageNumber === 1
                ? getInitialTaggedRestaurants.taggedRestaurants
                : getTaggedRestaurants.taggedRestaurants
              ).map((e: Restaurant, index: number) => {
                return (
                  <RestaurantLink
                    key={e.id}
                    restaurant={e}
                    className={`${
                      page ? "inview__in" : "inview"
                    } inview__scale0010 inview__delay${index % 3}`}
                  />
                );
              })}
            </Columns>

            <Stacked paddingPos="top" paddingSize="thin">
              <SimplePagination
                page={pageNumber}
                totalPages={totalPages}
                setPage={(page: number) => {
                  router.push(`/restaurant/tag/${id}?page=${page}`);
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
              <ToCategories postType="restaurant" categories={categories} />
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h3>タグで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToTags postType="restaurant" tags={tags} selected={id} />
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} key={s.id} />
            ))}
            more={url("shop")}
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="笑顔でお待ちしております！"
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

export default TaggedRestaurantsPage;
