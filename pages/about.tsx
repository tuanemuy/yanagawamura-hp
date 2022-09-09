import type { NextPage } from "next";
import { colors, fonts } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, Block, PlainText, Figure } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { ListWithTitle } from "components/container";
import { Concept, ConceptDetails } from "components/content";
import { MiniLink } from "components/button";
import { PageTitle } from "components/title";
import { Villager } from "components/cta";
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

const AboutPage: NextPage = () => {
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
      title="ヤナガワ村とは | 群馬県高崎市の商店街・飲み屋街"
      description="群馬県高崎市のヤナガワ村のご紹介です。柳川町や中央銀座通り周辺の商店街・飲み屋街エリアを「ヤナガワ村」と呼び、より愛される街にしたいと考えています。昔ながらの味わいのある風景と、関係の生まれる明るい街をお楽しみください。"
      path="about"
      ogType="article"
      header={
        <Header title="ヤナガワ村とは | 群馬県高崎市の商店街・飲み屋街" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="ヤナガワ村とは" />

        <Stacked paddingPos="top" wrap isSection>
          <Concept />
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ConceptDetails
            title="個性あふれる<br/>街のお店"
            description="お得さや目新しさを求めて比較的若い世代が飲みに出る駅周辺エリアとは異なり、このエリアには、チェーン店はほとんどありません。その代わりに様々な個性溢れる店舗が立ち並び、「誰々さんのお店に飲みに行く」というように「人」を動機に飲みに出かけられるお店が多いのが、ヤナガワ村の特徴です。"
            images={[
              "images/sample.jpg",
              "images/sample.jpg",
              "images/sample.jpg",
            ]}
            reverse
          />
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ConceptDetails
            title="人とつながる<br/>飲み屋街"
            description="定住人口は少ないですし、交流人口においても駅周辺には到底敵いません。しかし、このエリアは高崎市で最も「関係人口」が多い地域だと言う事ができると思うのです。頻繁にこのエリアに飲みに出かける人の事を、冗談まじりに「ヤナガワ村長」と表現する事がその象徴でもあります。ヤナガワ村長やヤナガワ村民が市内外に溢れているという事が、このエリアが持つ何よりの財産です。"
            images={[
              "images/sample.jpg",
              "images/sample.jpg",
              "images/sample.jpg",
            ]}
          />
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ConceptDetails
            title="昔ながらの雰囲気に<br/>身を委ねる"
            description="昔ながらのディープで笑顔あふれるその雰囲気に、あなたも身を委ねてみませんか？<br/>飲み屋が好きな方に限らず、多くの方に楽しんでいただきたいとの思いから、ヤナガワ村では多くのイベントを開催しています。食べ歩きや音楽ステージ、スケートボード、縁日など様々な企画があり、お子さまから大人までお楽しみいただけます。昭和の香りが漂うこの街にぜひお越しください。"
            images={[
              "images/sample.jpg",
              "images/sample.jpg",
              "images/sample.jpg",
            ]}
            reverse
          />
        </Stacked>

        <Stacked paddingPos="top" wrap isSection>
          <ListWithTitle
            title="飲食店"
            subtitle="笑顔でお待ちしております！"
            items={restaurants.map((r: Restaurant) => (
              <RestaurantLink restaurant={r} />
            ))}
            more={url("restaurant")}
            reverse
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
            reverse
          />
        </Stacked>

        <Stacked wrap isSection>
          <Villager />
        </Stacked>

        <Stacked wrap isSection color={colors.deepBlack}>
          <Stacked paddingPos="none">
            <PlainText
              h2SizeXL="3rem"
              h2SizeM="2.5rem"
              h2SizeXS="2.25rem"
              h2Family={fonts.heading}
              h2Color={colors.white}
              h2Align="center"
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
                  <Figure src="images/sample.jpg" width="100%" lazy />
                </div>
              </Block>

              <Block>
                <div className="inview inview__bt inview__delay2">
                  <Figure src="images/sample.jpg" width="100%" lazy />
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

export default AboutPage;
