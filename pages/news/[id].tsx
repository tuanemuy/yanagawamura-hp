import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ListWithTitle, Panel } from "components/container";
import { Villager } from "components/cta";
import { Footer, Header, Main } from "components/layout";
import { PageTitle } from "components/title";
import {
  type Event,
  Link as EventLink,
  getGetEventsPrefetcher,
  useGetEvents,
} from "domains/event";
import { getGetNewsPrefetcher, Single, useGetNews } from "domains/news";
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
import { extractDescription, url } from "lib/util";
import type { NextPage } from "next";
import { Block, Columns, PlainText, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

export async function getStaticPaths() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/post?post_type=news`,
  );
  const data = await result.json();

  return {
    paths: data.post.map((n: any) => ({ params: { id: n.id.toString() } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const queryClient = new QueryClient();
  const prefetches = [];

  const id = Number.parseInt(params.id, 10);

  if (Number.isNaN(id)) {
    return {
      notFound: true,
    };
  }

  const getNewsPrefetcher = getGetNewsPrefetcher({ id });
  prefetches.push(
    queryClient.prefetchQuery(getNewsPrefetcher.key, getNewsPrefetcher.fetcher),
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

  await Promise.all(prefetches);

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

type Props = {
  id: number;
};

const NewsSinglePage: NextPage<Props> = ({ id }) => {
  const { news } = useGetNews({ id });

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

  return (
    <Page
      title={`${news?.title || "ニュース"} | 群馬県高崎市のヤナガワ村`}
      description={
        news?.overview ||
        extractDescription(news?.body || "") ||
        "ヤナガワ村のニュースです。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えています。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      }
      path={`news/${news?.id || ""}`}
      ogType="article"
      header={
        <Header
          title={`${news?.title || "ニュース"} | 群馬県高崎市のヤナガワ村`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="ニュース" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Block widthXL="100%" maxWidth="900px">
              <Panel className="inview inview__scale0910 inview__delay1">
                {news && <Single news={news} />}

                {!news && (
                  <PlainText>
                    <p>記事を上手く読み込めませんでした。</p>
                  </PlainText>
                )}
              </Panel>
            </Block>
          </Columns>
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
            items={shops.map((s: Shop) => <ShopLink shop={s} key={s.id} />)}
            more={url("shop")}
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="一緒に盛り上がろう！"
            items={events.map((e: Event) => <EventLink event={e} key={e.id} />)}
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

export default NewsSinglePage;
