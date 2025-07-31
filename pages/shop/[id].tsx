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
import {
  getGetRestaurantsPrefetcher,
  type Restaurant,
  Link as RestaurantLink,
  useGetRestaurants,
} from "domains/restaurant";
import { getGetShopPrefetcher, Single, useGetShop } from "domains/shop";
import { Order_By } from "lib/graphql";
import { extractDescription, url } from "lib/util";
import type { NextPage } from "next";
import { Columns, PlainText, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

export async function getStaticPaths() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/post?post_type=shop`,
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

  const id = Number.parseInt(params.id, 10) || 0;

  const getShopPrefetcher = getGetShopPrefetcher({ id });
  prefetches.push(
    queryClient.prefetchQuery(getShopPrefetcher.key, getShopPrefetcher.fetcher),
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

const ShopSinglePage: NextPage<Props> = ({ id }) => {
  const { shop } = useGetShop({ id });

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

  return (
    <Page
      title={`${shop?.title || "物販・サービス店"} | 群馬県高崎市のヤナガワ村`}
      description={
        shop?.overview ||
        extractDescription(shop?.details || "") ||
        "ヤナガワ村の物販・サービス店情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、チェーン店はほとんどありません。その代わりに様々な個性溢れる店舗が立ち並びます。昭和の香りが漂うこの街をぜひお楽しみください。"
      }
      path={`shop/${shop?.id || ""}`}
      ogType="article"
      header={
        <Header
          title={`${shop?.title || "物販・サービス店"} | 群馬県高崎市のヤナガワ村`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="物販・サービス店" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Panel className="inview inview__scale0910 inview__delay1">
              {shop && <Single shop={shop} />}

              {!shop && (
                <PlainText>
                  <p>記事を上手く読み込めませんでした。</p>
                </PlainText>
              )}
            </Panel>
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

export default ShopSinglePage;
