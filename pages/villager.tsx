import type { NextPage } from "next";
import { colors, fonts } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, PlainText, Figure } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle } from "components/container";
import { Panel } from "components/container";
import { MiniLink, Social } from "components/button";
import { PageTitle } from "components/title";
import { Link as RestaurantLink } from "domains/restaurant";
import { Link as ShopLink } from "domains/shop";
import { Link as EventLink } from "domains/event";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Order_By } from "lib/graphql";
import {
  Restaurant,
  useGetRestaurants,
  getGetRestaurantsPrefetcher,
} from "domains/restaurant";
import { Shop, useGetShops, getGetShopsPrefetcher } from "domains/shop";
import { Event, useGetEvents, getGetEventsPrefetcher } from "domains/event";
import { url } from "lib/util";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];

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
    },
    revalidate: 60,
  };
}

const VillagerPage: NextPage = () => {
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
      title="ヤナガワ村民募集 | 群馬県高崎市の飲み屋街「ヤナガワ村」"
      description="ヤナガワ村"
      path="villager"
      ogType="article"
      header={
        <Header title="ヤナガワ村民募集 | 群馬県高崎市の飲み屋街「ヤナガワ村」" />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="ヤナガワ村民募集" />

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel className="inview inview__bt inview__delay1">
            <Stacked paddingPos="none">
              <PlainText
                baseAlign="center"
                h2Align="center"
                h2Family={fonts.heading}
                h2SizeXL="2.5rem"
                h2SizeM="2rem"
                h2SizeS="1.5rem"
                h2Weight="400"
                baseSizeXL="1.1rem"
                baseSizeS="1rem"
                baseLineHeight="2"
              >
                <h2>
                  LINE公式アカウントを友だち追加して
                  <br />
                  ヤナガワ村民になろう！
                </h2>
                <p>
                  ヤナガワ村を楽しむための特別な情報やイベントの情報をいち早く受け取りましょう。
                </p>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns justify="center" align="center" gap="normal">
                <Figure
                  src="images/line.png"
                  width="72px"
                  widthM="56px"
                  widthS="44px"
                />
                <Figure
                  src="images/line_official.png"
                  width="270px"
                  widthM="200px"
                  widthS="160px"
                />
              </Columns>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns justify="center">
                <MiniLink
                  name="早速友だち追加する"
                  to="https://lin.ee/VZvQHHH"
                  color={colors.theme}
                  target="_blank"
                />
              </Columns>
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Panel className="inview inview__bt inview__delay1">
            <Stacked paddingPos="none">
              <PlainText
                baseAlign="center"
                h2Align="center"
                h2Family={fonts.heading}
                h2SizeXL="2.5rem"
              >
                <h2>Follow us!!</h2>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns justify="center" align="center" gap="wide">
                <Social
                  name="LINE"
                  to="https://line.me/R/ti/p/@140ixtev"
                  icon="images/line.png"
                />

                <Social
                  name="Facebook"
                  to="https://www.facebook.com/shin.yanagawamura.yakuba"
                  icon="images/facebook.png"
                />

                <Social
                  name="Instagram"
                  to="https://www.instagram.com/shin.yanagawa.yakuba/"
                  icon="images/instagram.png"
                />
              </Columns>
            </Stacked>
          </Panel>
        </Stacked>

        <Stacked>
          <Stacked paddingPos="none" wrap isSection>
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
        </Stacked>
      </Main>
    </Page>
  );
};

export default VillagerPage;
