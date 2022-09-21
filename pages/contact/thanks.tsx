import type { NextPage } from "next";
import { colors, fonts } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, Columns, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { Panel } from "components/container";
import { PageTitle } from "components/title";
import { MiniLink } from "components/button";

import { url } from "lib/util";

const ContactThanksPage: NextPage = () => {
  return (
    <Page
      title="お問い合わせ完了 | 群馬県高崎市の飲み屋街【ヤナガワ村】"
      description="お問い合わせありがとうございます。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」です。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      path="contact/thanks"
      ogType="article"
      header={
        <Header title="お問い合わせ完了 | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="お問い合わせ完了" />

        <Stacked paddingSize="narrow" wrap isSection>
          <Panel>
            <Stacked paddingPos="none">
              <PlainText
                baseAlign="center"
                h2Align="center"
                h2SizeXL="2.5rem"
                h2SizeM="1.75rem"
              >
                <h2>お問い合わせありがとうございます</h2>
                <p>
                  この度は、ヤナガワ村役場にお問い合わせくださり、誠にありがとうございます。
                  <br />
                  返信があるまで今しばらくお待ちください。
                </p>
              </PlainText>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns justify="center">
                <MiniLink
                  name="ホームに戻る"
                  to={url("")}
                  color={colors.theme}
                />
              </Columns>
            </Stacked>
          </Panel>
        </Stacked>
      </Main>
    </Page>
  );
};

export default ContactThanksPage;
