import { dehydrate, QueryClient } from "@tanstack/react-query";
import { MiniLink } from "components/button";
import { ListWithTitle } from "components/container";
import { Concept } from "components/content";
import { Villager } from "components/cta";
import { Footer, Header, Main } from "components/layout";
import {
  type Event,
  Link as EventLink,
  getGetEventsPrefetcher,
  useGetEvents,
} from "domains/event";
import {
  getGetMainVisualsPrefetcher,
  Slider,
  useGetMainVisuals,
} from "domains/mainVisual";
import {
  getGetNewsArchivePrefetcher,
  Headline,
  useGetNewsArchive,
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
import { Block, Columns, Figure, PlainText, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors, fonts } from "variables";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const prefetches = [];

  const getMainVisualsPrefetcher = getGetMainVisualsPrefetcher({
    limit: 5,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getMainVisualsPrefetcher.key,
      getMainVisualsPrefetcher.fetcher,
    ),
  );

  const getNewsArchivePrefetcher = getGetNewsArchivePrefetcher({
    limit: 10,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });
  prefetches.push(
    queryClient.prefetchQuery(
      getNewsArchivePrefetcher.key,
      getNewsArchivePrefetcher.fetcher,
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
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

const HomePage: NextPage = () => {
  const { mainVisuals } = useGetMainVisuals({
    limit: 5,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

  const { newsArchive } = useGetNewsArchive({
    limit: 10,
    offset: 0,
    orderBy: { created_at: Order_By.Desc },
  });

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
      title="ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="群馬県高崎市のヤナガワ村です。柳川町や中央銀座通り周辺の商店街・飲み屋街エリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えています。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      path=""
      ogType="website"
      header={<Header title="群馬県高崎市の商店街・飲み屋街【ヤナガワ村】" />}
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <Stacked paddingPos="none" isSection>
          <Headline news={newsArchive} />
        </Stacked>

        <Stacked paddingPos="none" isSection zIndex={2}>
          <Slider mainVisuals={mainVisuals} />
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <Concept />
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

        <Stacked wrap isSection color={colors.deepBlack}>
          <Stacked paddingPos="none">
            <PlainText
              h2SizeXL="3.25rem"
              h2SizeM="2.5rem"
              h2SizeXS="2.25rem"
              h2Family={fonts.heading}
              h2Color={colors.white}
              h2Align="center"
              h2Weight={400}
              h3Color={colors.white}
              h3Align="center"
              h3Weight="400"
              h3SizeXL="1.5rem"
              h3SizeM="1.25rem"
              h3SizeXS="1.1rem"
              baseColor={colors.white}
            >
              <h2 className="inview inview__rl inview__delay2">
                一緒にヤナガワ村を盛り上げませんか？
              </h2>
              <h3 className="inview inview__bt inview__delay2">
                ヤナガワ村加盟店・イベント出店者・スポンサー・村役場メンバー募集中！
              </h3>
            </PlainText>
          </Stacked>

          <Stacked paddingPos="top" paddingSize="narrow">
            <PlainText
              baseColor={colors.white}
              baseAlign="center"
              baseLineHeight="2"
            >
              <p className="inview inview__bt inview__delay2">
                にぎやかな街を取り戻したいと強く願うメンバーが集まり、「ヤナガワ村役場」として地域活性化の取り組みやイベントの企画を行っています。
                <br />
                同じ思いを持つ方は、ぜひお気軽にお問い合わせください。
                <br />
                ヤナガワ村への加盟、イベントへの出店・協賛、スポンサー登録、村役場メンバーへの参加等様々な形でご協力していただけます。
                <br />
                一緒にヤナガワ村の未来を考えましょう！
              </p>
            </PlainText>
          </Stacked>

          <Stacked paddingPos="top" paddingSize="narrow">
            <Columns justify="center" repeat={2} repeatS={1} gap="normal">
              <Block>
                <div className="inview inview__bt inview__delay1">
                  <Figure
                    src="images/member_01.jpg"
                    width="100%"
                    name="メンバー募集"
                    lazy
                  />
                </div>
              </Block>

              <Block>
                <div className="inview inview__bt inview__delay2">
                  <Figure
                    src="images/member_02.jpg"
                    width="100%"
                    name="メンバー募集"
                    lazy
                  />
                </div>
              </Block>
            </Columns>
          </Stacked>

          <Stacked paddingPos="top" paddingSize="narrow">
            <Columns justify="center">
              <MiniLink
                name="詳しく見る"
                to={url("wanted")}
                color={colors.theme}
              />
            </Columns>
          </Stacked>
        </Stacked>
      </Main>
    </Page>
  );
};

export default HomePage;
