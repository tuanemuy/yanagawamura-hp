import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ListWithTitle, Panel } from "components/container";
import { Villager } from "components/cta";
import { Footer, Header, Main } from "components/layout";
import { PageTitle } from "components/title";
import { getGetEventPrefetcher, Single, useGetEvent } from "domains/event";
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
import { extractFile } from "lib/cms";
import { Order_By } from "lib/graphql";
import { extractDescription, url } from "lib/util";
import type { NextPage } from "next";
import { Columns, PlainText, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

export async function getStaticPaths() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/post?post_type=event`,
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

  const getEventPrefetcher = getGetEventPrefetcher({ id });
  prefetches.push(
    queryClient.prefetchQuery(
      getEventPrefetcher.key,
      getEventPrefetcher.fetcher,
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

const EventSinglePage: NextPage<Props> = ({ id }) => {
  const { event } = useGetEvent({ id });

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

  return (
    <Page
      title={`${event?.title || "イベント"} | 群馬県高崎市のヤナガワ村`}
      description={
        event?.overview ||
        extractDescription(event?.details || "") ||
        "ヤナガワ村のイベント情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」では、お子さまからご高齢の方まで、男女問わず楽しんでいただけるイベントを開催しています。その最新情報をお届けします。"
      }
      path={`event/${event?.id || ""}`}
      ogType="article"
      ogImage={
        event
          ? extractFile(event.keyVisual, "1200")?.url || event.keyVisual.url
          : undefined
      }
      header={
        <Header
          title={`${event?.title || "イベント"} | 群馬県高崎市のヤナガワ村`}
        />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="イベント" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Panel className="inview inview__scale0910 inview__delay1">
              {event && <Single event={event} />}

              {!event && (
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
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => <ShopLink shop={s} key={s.id} />)}
            more={url("shop")}
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

export default EventSinglePage;
