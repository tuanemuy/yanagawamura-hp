import { PlainText as MyPlainText, Panel } from "components/container";
import { Footer, Header, Main } from "components/layout";
import { PageTitle } from "components/title";
import { url } from "lib/util";
import type { NextPage } from "next";
import { Block, Columns, Stacked } from "unflexible-ui-core";
import { Page } from "unflexible-ui-next-page";
import { colors } from "variables";

const PrivacyPage: NextPage = () => {
  return (
    <Page
      title="個人情報保護方針 | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村の個人情報保護方針です。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」です。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      path="privacy-policy"
      ogType="article"
      header={
        <Header title="個人情報保護方針 | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="個人情報保護方針" />

        <Stacked paddingSize="narrow" wrap isSection>
          <Columns justify="center">
            <Block maxWidth="900px" widthXL="100%">
              <Panel>
                <Stacked paddingPos="none">
                  <MyPlainText>
                    <p>
                      当社は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
                    </p>

                    <h2>個人情報の管理</h2>
                    <p>
                      当社は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
                    </p>

                    <h2>個人情報の利用目的</h2>
                    <p>
                      本ウェブサイトでは、お客様からのお問い合わせ時に、お名前、Emailアドレス、電話番号等の個人情報をご登録いただく場合がございますが、これらの個人情報はご提供いただく際の目的以外では利用いたしません。
                    </p>
                    <p>
                      お客さまからお預かりした個人情報は、当社からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
                    </p>

                    <h2>個人情報の第三者への開示・提供の禁止</h2>
                    <p>
                      当社は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
                    </p>
                    <ul>
                      <li>お客さまの同意がある場合</li>
                      <li>
                        お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合
                      </li>
                      <li>法令に基づき開示することが必要である場合</li>
                    </ul>

                    <h2>個人情報の安全対策</h2>
                    <p>
                      当社は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。
                    </p>

                    <h2>ご本人の照会</h2>
                    <p>
                      お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。
                    </p>

                    <h2>法令、規範の遵守と見直し</h2>
                    <p>
                      当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
                    </p>

                    <h2>Cookieについて</h2>
                    <p>
                      当社は、当社のウェブサイトをより一層便利にご利用いただけるよう、サイトの中にCookies（クッキー）を使用する場合がありますが、Cookiesによって個人を特定できる情報を得ることはありません。
                    </p>

                    <h2>お問い合わせ</h2>
                    <p>
                      <a href={url("contact")}>お問い合わせフォーム</a>
                      よりお問い合わせください。
                    </p>
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

export default PrivacyPage;
