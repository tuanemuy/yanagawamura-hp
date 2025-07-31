import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ToCategories, ToTags } from "components/button";
import { ListWithTitle, Panel, PlainList } from "components/container";
import { Villager } from "components/cta";
import { Footer, Header, Main } from "components/layout";
import { SimplePagination } from "components/pagination";
import { PageTitle } from "components/title";
import {
  type Event,
  Link as EventLink,
  getGetEventsPrefetcher,
  useGetEvents,
} from "domains/event";
import {
  getGetCategoriesPrefetcher,
  getGetTaggedNewsArchivePrefetcher,
  getGetTagsPrefetcher,
  type News,
  Link as NewsLink,
  useGetCategories,
  useGetTaggedNewsArchive,
  useGetTags,
} from "domains/news";
import {
  getGetRestaurantsPrefetcher,
  type Restaurant,
  Link as RestaurantLink,
  useGetRestaurants,
} from "domains/restaurant";
import {
  getGetShopsPrefetcher,
  type Shop,
  Link as ShopLink,
  useGetShops,
} from "domains/shop";
import { Order_By } from "lib/graphql";
import { url } from "lib/util";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { StoreContext } from "providers";
import { useContext, useEffect } from "react";
import { Block, Columns, PlainText, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

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

  const id = Number.parseInt(params.id, 10) || 0;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/tag/${id}`,
  );
  const tag = await result.json();

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const getTaggedNewsArchivePrefetcher = getGetTaggedNewsArchivePrefetcher({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getTaggedNewsArchivePrefetcher.key,
      getTaggedNewsArchivePrefetcher.fetcher,
    ),
  );

  const getEventsPrefetcher = getGetEventsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getEventsPrefetcher.key,
      getEventsPrefetcher.fetcher,
    ),
  );

  const getRestaurantsPrefetcher = getGetRestaurantsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getRestaurantsPrefetcher.key,
      getRestaurantsPrefetcher.fetcher,
    ),
  );

  const getShopsPrefetcher = getGetShopsPrefetcher({
    limit: 3,
    offset: 0,
    orderBy: { title: Order_By.Asc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getShopsPrefetcher.key,
      getShopsPrefetcher.fetcher,
    ),
  );

  const getCategoriesPrefetcher = getGetCategoriesPrefetcher();
  prefetches.push(
    queryClient.prefetchQuery(
      getCategoriesPrefetcher.key,
      getCategoriesPrefetcher.fetcher,
    ),
  );

  const getTagsPrefetcher = getGetTagsPrefetcher();
  prefetches.push(
    queryClient.prefetchQuery(getTagsPrefetcher.key, getTagsPrefetcher.fetcher),
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

const TaggedNewsArchivePage: NextPage<Props> = ({ id, tagName, limit }) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNumber: number = Array.isArray(page)
    ? Number.parseInt(page[0] || "1", 10) || 1
    : Number.parseInt(page || "1", 10) || 1;

  const store = useContext(StoreContext);

  const getInitialTaggedNewsArchive = useGetTaggedNewsArchive({
    tagId: id,
    limit,
    offset: 0,
    orderBy: { post: { created_at: Order_By.Desc } },
  });

  const getTaggedNewsArchive = useGetTaggedNewsArchive({
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
      ? Math.ceil((getInitialTaggedNewsArchive.count || 0) / limit)
      : Math.ceil((getTaggedNewsArchive.count || 0) / limit);

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
      !getTaggedNewsArchive.taggedNewsArchive &&
        getTaggedNewsArchive.isFetching,
    );
  }, [getTaggedNewsArchive.taggedNewsArchive, getTaggedNewsArchive.isFetching]);

  return (
    <Page
      title={`#${
        tagName || ""
      } のニュース | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街`}
      description={`「${
        tagName || ""
      }」タグのヤナガワ村のニュースです。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えています。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします`}
      path={`news/tag/${id}`}
      ogType="article"
      header={
        <Header
          title={`#${
            tagName || ""
          } のニュース | 群馬県高崎市の飲み屋街【ヤナガワ村】`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title={`#${tagName} のニュース`} />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Block widthXL="100%" maxWidth="900px">
              <Panel>
                <Stacked paddingPos="none">
                  <PlainList
                    items={(pageNumber === 1
                      ? getInitialTaggedNewsArchive.taggedNewsArchive
                      : getTaggedNewsArchive.taggedNewsArchive
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
                      router.push(`/news/tag/${id}?page=${page}`);
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
              <ToCategories postType="news" categories={categories} />
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h3>タグで検索</h3>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <ToTags postType="news" tags={tags} selected={id} />
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
            items={shops.map((s: Shop) => <ShopLink shop={s} key={s.id} />)}
            more={url("shop")}
            reverse
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="一緒に盛り上がろう！"
            items={events.map((e: Event) => <EventLink event={e} key={e.id} />)}
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

export default TaggedNewsArchivePage;
