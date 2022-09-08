import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, Panel } from "components/container";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
import { Single } from "domains/restaurant";
import { Link as ShopLink } from "domains/shop";
import { Link as EventLink } from "domains/event";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  useGetRestaurant,
  getGetRestaurantPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { url, extractDescription } from "lib/util";

export async function getStaticPaths() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE || ""}/post?post_type=restaurant`
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

  const id = parseInt(params.id, 10) || 0;

  const getRestaurantPrefetcher = getGetRestaurantPrefetcher({ id });
  prefetches.push(
    queryClient.prefetchQuery(
      getRestaurantPrefetcher.key,
      getRestaurantPrefetcher.fetcher
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
      id,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

type Props = {
  id: number;
};

const RestaurantSinglePage: NextPage<Props> = ({ id }) => {
  const { restaurant } = useGetRestaurant({ id });

  const { shops } = useGetShops({
    limit: 3,
    offset: 0,
    orderBy: { contents_aggregate: { max: { title: Order_By.Asc } } },
  });

  const { events } = useGetEvents({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  return (
    <Page
      title={`${restaurant?.title || "飲食店"} | ヤナガワ村`}
      description={
        restaurant?.overview ||
        extractDescription(restaurant?.details || "") ||
        "ヤナガワ村の飲食店情報です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、「人」を目当てに飲みに行けるような、温かい飲食店がたくさんあります。昔ながらのディープで笑顔あふれる雰囲気をぜひお楽しみください。"
      }
      path={`/restaurant/${restaurant?.id} || "/restaurant"`}
      ogType="article"
      header={
        <Header title={`${restaurant?.title || "飲食店"} | ヤナガワ村`} />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="飲食店" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Panel className="inview inview__scale0910 inview__delay1">
              {restaurant && <Single restaurant={restaurant} />}

              {!restaurant && (
                <PlainText>
                  <p>記事を上手く読み込めませんでした。</p>
                </PlainText>
              )}
            </Panel>
          </Columns>
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} />
            ))}
            more={url("shop")}
          />
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <ListWithTitle
            title="イベント"
            subtitle="笑顔でお待ちしております！"
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

export default RestaurantSinglePage;
