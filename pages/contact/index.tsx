import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked, PlainText } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { Panel, Form } from "components/container";
import { PageTitle } from "components/title";
import { MiniButton } from "components/button";

import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { url } from "lib/util";

type FormFields = {
  name: string;
  email: string;
  body: string;
};

const ContactPage: NextPage = () => {
  const router = useRouter();
  const form = useForm<FormFields>();

  const submit: SubmitHandler<FormFields> = async (input) => {
    console.log(input);
    try {
      const result = await fetch(url("api/contact"));

      if (result.ok) {
        router.push("/contact/thanks");
      } else {
        const data = await result.json();
        console.error(data.error || "Unexpected error");
      }
    } catch (e) {
      console.log("Unexpected error");
    }
  };

  return (
    <Page
      title="お問い合わせ | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
      description="ヤナガワ村へのお問い合わせはこちらから。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」です。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
      path="/contact"
      ogType="website"
      header={
        <Header title="お問い合わせ | 群馬県高崎市の飲み屋街【ヤナガワ村】" />
      }
      footer={<Footer />}
      fixHeader
    >
      <Main color={colors.background} avoidHeader>
        <PageTitle title="お問い合わせ" />

        <Stacked paddingSize="narrow" wrap isSection>
          <Panel>
            <Form>
              <form onSubmit={form.handleSubmit(submit)}>
                <div className="line">
                  <div className="label required">
                    <label htmlFor="name">お名前</label>
                  </div>

                  <div className="input">
                    <input
                      type="text"
                      id="name"
                      {...form.register("name", {
                        required: true,
                        minLength: 1,
                        maxLength: 30,
                      })}
                    />
                    {form.formState.errors.name && (
                      <p className="error">正しく入力してください</p>
                    )}
                  </div>
                </div>

                <div className="line">
                  <div className="label required">
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="input">
                    <input
                      type="text"
                      id="email"
                      {...form.register("email", {
                        required: true,
                        minLength: 1,
                        maxLength: 100,
                      })}
                    />
                    {form.formState.errors.email && (
                      <p className="error">正しく入力してください</p>
                    )}
                  </div>
                </div>

                <div className="line">
                  <div className="label required">
                    <label htmlFor="body">問い合わせ内容</label>
                  </div>

                  <div className="input">
                    <textarea
                      id="body"
                      rows={10}
                      {...form.register("body", {
                        required: true,
                        minLength: 1,
                        maxLength: 1000,
                      })}
                    />
                    {form.formState.errors.body && (
                      <p className="error">正しく入力してください</p>
                    )}
                  </div>
                </div>

                <div className="line">
                  <div className="label"></div>

                  <div className="input checkbox">
                    <input type="checkbox" id="privacy" required />
                    <label htmlFor="privacy">
                      <a href={url("privacy-policy")} target="_blank">
                        個人情報保護方針
                      </a>
                      に同意します
                    </label>
                  </div>
                </div>

                <div className="line">
                  <MiniButton
                    name="送信する"
                    type="submit"
                    color={colors.theme}
                  />
                </div>
              </form>
            </Form>
          </Panel>
        </Stacked>
      </Main>
    </Page>
  );
};

export default ContactPage;
