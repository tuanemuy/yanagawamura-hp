import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, Panel } from "components/container";
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
  Category,
  Tag,
  useGetShops,
  getGetShopsPrefetcher,
} from "domains/shop";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { StoreContext } from "providers";
import { url } from "lib/util";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];
  const limit = 9;

  const categoriesResult = fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/category?post_type=shop`
  );
  const tagsResult = fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/tag`);

  const results = await Promise.all([categoriesResult, tagsResult]);
  const categories = await results[0].json();
  const tags = await results[1].json();

  const categoryIds = categories.category.map((v: any) => v.id);
  const tagIds = tags.tag.map((v: any) => v.id);

  const getShopsPrefetcher = getGetShopsPrefetcher({
    limit,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getShopsPrefetcher.key,
      getShopsPrefetcher.fetcher
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

const ShopArchivePage: NextPage<Props> = ({
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

  const getInitialShops = useGetShops({
    limit,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  const getShops = useGetShops({
    limit,
    offset: limit * (pageNumber - 1),
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
    options: {
      enabled: pageNumber !== 1,
    },
  });

  const totalPages =
    pageNumber === 1
      ? Math.ceil((getInitialShops.count || 0) / limit)
      : Math.ceil((getShops.count || 0) / limit);

  const { restaurants } = useGetRestaurants({
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
    store.busy.setIsBusy(!getShops.shops && getShops.isFetching);
  }, [getShops.shops, getShops.isFetching]);

  return (
    <Page
      title="物販・サービス店 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村の物販・サービス店情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、チェーン店はほとんどありません。その代わりに様々な個性溢れる店舗が立ち並びます。昭和の香りが漂うこの街をぜひお楽しみください。"
      path="/shop"
      ogType="article"
      header={
        <Header title="物販・サービス店 | 群馬県高崎市の商店街【ヤナガワ村】" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="物販・サービス店" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
                {(pageNumber === 1
                  ? getInitialShops.shops
                  : getShops.shops
                ).map((r: Shop, index: number) => {
                  return (
                    <ShopLink
                      key={r.id}
                      shop={r}
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
                  router.push(`/shop?page=${page}`);
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
            title="飲食店"
            subtitle="笑顔でお待ちしております！"
            items={restaurants.map((r: Restaurant) => (
              <RestaurantLink restaurant={r} />
            ))}
            more={url("restaurant")}
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

export default ShopArchivePage;
