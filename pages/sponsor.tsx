import { PlainText as MyPlainText, Panel } from "components/container";
import { Footer, Header, Main } from "components/layout";
import { PageTitle } from "components/title";
import type { NextPage } from "next";
import { Block, Columns, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

const SponsorPage: NextPage = () => {
  return (
    <Page
      title="スポンサー紹介 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村のスポンサー様のご紹介です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」です。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      path="sponsor"
      ogType="article"
      header={
        <Header title="スポンサー紹介 | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="スポンサー紹介" />

        <Stacked paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Block maxWidth="900px" widthXL="100%">
              <Panel>
                <Stacked paddingPos="none">
                  <MyPlainText>
                    <p>※ 名称順（敬称略）</p>
                    <h2>令和4年 ヤナガワ村祭り 【夏】</h2>
                    <ul>
                      <li>赤城乳業（株）</li>
                      <li>石川建設（株）</li>
                      <li>江原会計事務所</li>
                      <li>（株）企画社</li>
                      <li>キリンビール（株）</li>
                      <li>キリンビバレッジ（株）</li>
                      <li>（株）グランビュー</li>
                      <li>（株）群成舎</li>
                      <li>コカ・コーラボトラーズジャパン（株）</li>
                      <li>国際警備保障（株）</li>
                      <li>（株）ジェイ・ケイ・プラン</li>
                      <li>（株）CCE</li>
                      <li>島津会計税理士法人</li>
                      <li>新紺屋町町内会</li>
                      <li>タケオ・リアル&タカサキシティバンド</li>
                      <li>バーソムリエ</li>
                      <li>（株） BIGWIG</li>
                      <li>藤田エンジニアリング（株）</li>
                      <li>（株）マルミツ</li>
                      <li>ミュージックシティプロモーション株式会社</li>
                      <li>來來</li>
                    </ul>
                  </MyPlainText>
                </Stacked>
              </Panel>
            </Block>
          </Columns>
        </Stacked>
      </Main>
    </Page>
  );
};

export default SponsorPage;
