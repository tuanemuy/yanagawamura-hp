import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, Block, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, PlainList, Panel } from "components/container";
import { ToCategories, ToTags } from "components/button";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
import { SimplePagination } from "components/pagination";
import { Link as NewsLink } from "domains/news";
import { Link as RestaurantLink } from "domains/restaurant";
import { Link as ShopLink } from "domains/shop";
import { Link as EventLink } from "domains/event";

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  News,
  useGetCategorizedNewsArchive,
  getGetCategorizedNewsArchivePrefetcher,
  useGetCategories,
  getGetCategoriesPrefetcher,
  useGetTags,
  getGetTagsPrefetcher,
} from "domains/news";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { StoreContext } from "providers";
import { url } from "lib/util";

export async function getStaticPaths() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/category?post_type=news`
  );
  const data = await result.json();

  return {
    paths: data.category.map((t: any) => ({ params: { id: t.id.toString() } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const queryClient = new QueryClient();
  const prefetches = [];
  const limit = 9;

  const id = parseInt(params.id, 10) || 0;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/category/${id}`
  );
  const category = await result.json();

  if (!category.category_by_pk) {
    return {
      notFound: true,
    };
  }

  const getCategorizedNewsArchivePrefetcher =
    getGetCategorizedNewsArchivePrefetcher({
      categoryId: id,
      limit,
      offset: 0,
      orderBy: { created_at: Order_By.Desc },
    });
  prefetches.push(
    queryClient.prefetchQuery(
      getCategorizedNewsArchivePrefetcher.key,
      getCategorizedNewsArchivePrefetcher.fetcher
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
      categoryName: category.category_by_pk?.name || "",
      dehydratedState: dehydrate(queryClient),
      limit,
    },
    revalidate: 60,
  };
}

type Props = {
  id: number;
  categoryName: string;
  limit: number;
};

const CategorizedNewsArchivePage: NextPage<Props> = ({
  id,
  categoryName,
  limit,
}) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? parseInt(page[0] || "1", 10) || 1
    : parseInt(page || "1", 10) || 1;

  const store = useContext(StoreContext);

  const getInitialCategorizedNewsArchive = useGetCategorizedNewsArchive({
    categoryId: id,
    limit,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  const getCategorizedNewsArchive = useGetCategorizedNewsArchive({
    categoryId: id,
    limit,
    offset: limit * (pageNumber - 1),
    orderBy: { created_at: Order_By.Desc },
    options: {
      enabled: pageNumber !== 1,
    },
  });

  const totalPages =
    pageNumber === 1
      ? Math.ceil((getInitialCategorizedNewsArchive.count || 0) / limit)
      : Math.ceil((getCategorizedNewsArchive.count || 0) / limit);

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

  const { events } = useGetEvents({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  const { categories } = useGetCategories();

  const { tags } = useGetTags();

  useEffect(() => {
    store.busy.setIsBusy(
      !getCategorizedNewsArchive.categorizedNewsArchive &&
        getCategorizedNewsArchive.isFetching
    );
  }, [
    getCategorizedNewsArchive.categorizedNewsArchive,
    getCategorizedNewsArchive.isFetching,
  ]);

  return (
    <Page
      title={`${
        categoryName || ""
      } のニュース | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街`}
      description={`「${
        categoryName || ""
      }」カテゴリーのヤナガワ村のニュースです。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えています。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします`}
      path={`news/category/${id}`}
      ogType="article"
      header={
        <Header
          title={`${
            categoryName || ""
          } のニュース | 群馬県高崎市の飲み屋街【ヤナガワ村】`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title={`${categoryName} のニュース`} />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Block widthXL="100%" maxWidth="900px">
              <Panel>
                <Stacked paddingPos="none">
                  <PlainList
                    items={(pageNumber === 1
                      ? getInitialCategorizedNewsArchive.categorizedNewsArchive
                      : getCategorizedNewsArchive.categorizedNewsArchive
                    ).map((n: News) => {
                      return (
                        <li key={n.id}>
                          <NewsLink news={n} />
                        </li>
                      );
                    })}
                    border={`1px solid ${colors.gray}`}
                  />
                </Stacked>

                <Stacked paddingPos="top" paddingSize="thin">
                  <SimplePagination
                    page={pageNumber}
                    totalPages={totalPages}
                    setPage={(page: number) => {
                      router.push(`/news/category/${id}?page=${page}`);
                    }}
                  />
                </Stacked>
              </Panel>
            </Block>
          </Columns>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="thin" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <PlainText>
                <h3>カテゴリーで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToCategories
                postType="news"
                categories={categories}
                selected={id}
              />
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h3>タグで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToTags postType="news" tags={tags} />
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
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} key={s.id} />
            ))}
            more={url("shop")}
            reverse
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
          />
        </Stacked>

        <Stacked wrap isSection>
          <Villager />
        </Stacked>
      </Main>
    </Page>
  );
};

export default CategorizedNewsArchivePage;
