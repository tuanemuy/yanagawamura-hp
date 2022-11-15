import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle, Panel, PlainText } from "components/container";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
import { Link as RestaurantLink } from "domains/restaurant";
import { Link as ShopLink } from "domains/shop";
import { Link as EventLink } from "domains/event";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  Restaurant,
  useGetTaggedRestaurants,
  getGetTaggedRestaurantsPrefetcher,
} from "domains/restaurant";
import {
  Shop,
  useGetTaggedShops,
  getGetTaggedShopsPrefetcher,
} from "domains/shop";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { url } from "lib/util";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];

  const getRestaurantsPrefetcher = getGetTaggedRestaurantsPrefetcher({
    tagId: parseInt(process.env.ELECTION_TAG_ID || "0"),
    limit: 100,
    offset: 0,
    orderBy: { post: { title: Order_By.Asc } },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getRestaurantsPrefetcher.key,
      getRestaurantsPrefetcher.fetcher
    )
  );

  const getShopsPrefetcher = getGetTaggedShopsPrefetcher({
    tagId: parseInt(process.env.ELECTION_TAG_ID || "0"),
    limit: 100,
    offset: 0,
    orderBy: { post: { title: Order_By.Asc } },
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
      dehydratedState: dehydrate(queryClient),
      tagId: parseInt(process.env.ELECTION_TAG_ID || "0"),
    },
    revalidate: 60,
  };
}

type Props = { tagId: number };

const RestaurantArchivePage: NextPage<Props> = ({ tagId }) => {
  const { taggedRestaurants } = useGetTaggedRestaurants({
    tagId,
    limit: 100,
    offset: 0,
    orderBy: { post: { title: Order_By.Asc } },
  });

  const { taggedShops } = useGetTaggedShops({
    tagId,
    limit: 100,
    offset: 0,
    orderBy: { post: { title: Order_By.Asc } },
  });

  const { events } = useGetEvents({
    limit: 3,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  return (
    <Page
      title="村長選挙参加店舗 | 群馬県高崎市の商店街「ヤナガワ村」"
      description="ヤナガワ村長選挙参加店舗の一覧です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」には、「人」を目当てに飲みに行けるような、温かい飲食店がたくさんあります。昔ながらのディープで笑顔あふれる雰囲気をぜひお楽しみください。"
      path="election/locations"
      ogType="article"
      header={
        <Header title="村長選挙参加店舗 | 群馬県高崎市の飲み屋街「ヤナガワ村」" />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="村長選挙参加店舗" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <PlainText>
                <h2>ヤナガワ村長選挙参加店舗一覧</h2>
                <p>ヤナガワ村長選挙の参加店舗一覧です。</p>
                <h3>選挙期間中</h3>
                <p>選挙期間中は、以下の店舗にて投票を行うことができます。</p>
                <h3>特別名刺を持っている方</h3>
                <p>村長選挙で上位になるともらえる特別名刺を持っている方は、以下の店舗にて優待を受けることができます。</p>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <PlainText>
                <h2>飲食店</h2>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
                {(taggedRestaurants || []).map(
                  (r: Restaurant, index: number) => {
                    return (
                      <RestaurantLink
                        key={r.id}
                        restaurant={r}
                        className={`inview inview__scale0010 inview__delay${
                          index % 3
                        }`}
                      />
                    );
                  }
                )}
              </Columns>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="narrow">
              <PlainText>
                <h2>物販・サービス店</h2>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns repeatXL={3} repeatM={2} repeatS={1} gap="wide">
                {(taggedShops || []).map((s: Shop, index: number) => {
                  return (
                    <ShopLink
                      key={s.id}
                      shop={s}
                      className={`inview inview__scale0010 inview__delay${
                        index % 3
                      }`}
                    />
                  );
                })}
              </Columns>
            </Stacked>
          </Panel>
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

export default RestaurantArchivePage;
