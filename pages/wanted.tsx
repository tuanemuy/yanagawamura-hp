import type { NextPage } from "next";
import { colors, fonts } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, Block, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle } from "components/container";
import { MiniLink } from "components/button";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
import { Panel } from "components/content";
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

const WantedPage: NextPage = () => {
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
      title="協力してくれる方募集 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村に協力してくれる方を募集しています。ヤナガワ村への加盟、イベントへの出店・協賛、スポンサー登録、村役場メンバーへの参加等様々な形で群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」にご協力していただけます。"
      path="wanted"
      ogType="article"
      header={
        <Header title="協力してくれる方募集 | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="協力してくれる方募集中！" />

        <Stacked paddingPos="top" wrap isSection>
          <PlainText
            baseAlign="center"
            h2Align="center"
            h2SizeXL="3rem"
            h2SizeL="2.75rem"
            h2SizeXS="2rem"
            h2Family={fonts.heading}
          >
            <h2 className="inview inview__rl inview__delay1">
              私たちと一緒にヤナガワ村を盛り上げませんか？
            </h2>
            <p className="inview inview__bt inview__delay1">
              様々な形でヤナガワ村にご協力いただけます。
            </p>
          </PlainText>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Columns repeatXL={2} repeatS={1} gap="wide">
            <Block height="100%">
              <Panel
                className="inview inview__scale0010 inview__delay1"
                title="ヤナガワ村加盟店"
                description="ヤナガワ村にご加盟いただいた店舗には、積極的にイベント等へのご協力依頼をさせていただきます。また、店舗情報をホームページに掲載して宣伝いたします。"
              />
            </Block>

            <Block height="100%">
              <Panel
                className="inview inview__scale0010 inview__delay3"
                title="イベント出店"
                description="時期や場所の関係でお声がけできていない方もいらっしゃるかもしれません。イベントに出店してくださる方はどなたでも大歓迎です！"
              />
            </Block>

            <Block height="100%">
              <Panel
                className="inview inview__scale0010 inview__delay1"
                title="スポンサー・イベント協賛"
                description="地域活性化の取り組みやイベントに協力してくださる皆さまに支えられて、ヤナガワ村はかつての賑わいを取り戻しつつあります。スポンサーやイベント協賛という形でご協力いただいた方は、Webサイト上や各種出版物に掲載させていただきます。"
              />
            </Block>

            <Block height="100%">
              <Panel
                className="inview inview__scale0010 inview__delay3"
                title="村役場メンバー"
                description="街づくりに携わりたい方や、楽しいイベントを企画したい方は、ぜひ村役場のメンバーにご参加ください。ヤナガワ村の未来を一緒に考えましょう！"
              />
            </Block>
          </Columns>
        </Stacked>

        <Stacked paddingPos="top" paddingSize="narrow" wrap isSection>
          <Stacked paddingPos="none">
            <PlainText baseAlign="center">
              <p className="inview inview__bt inview__delay1">
                興味のある方は、お気軽にお問い合わせください。
              </p>
            </PlainText>
          </Stacked>

          <Stacked paddingPos="top" paddingSize="thin">
            <Columns justify="center">
              <div className="inview inview__bt inview__delay1">
                <MiniLink
                  name="早速問い合わせてみる！"
                  to={url("contact")}
                  color={colors.theme}
                />
              </div>
            </Columns>
          </Stacked>
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
            title="物販・サービス店"
            subtitle="ここでしか出会えないもの。"
            items={shops.map((s: Shop) => (
              <ShopLink shop={s} />
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
              <EventLink event={e} />
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

export default WantedPage;
