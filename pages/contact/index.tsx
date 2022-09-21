import type { NextPage } from "next";
import { colors } from "variables";
import { Page } from "unflexible-ui-next-page";
import { Stacked } from "unflexible-ui-core";
import { Header, Main, Footer } from "components/layout";
import { Panel, Form } from "components/container";
import { PageTitle } from "components/title";
import { MiniButton } from "components/button";
import { Loader, Message } from "components/popup";
import { App } from "domains/ui";

import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { StoreContext } from "providers";
import { url } from "lib/util";

type FormFields = {
  name: string;
  email: string;
  tel: string;
  address: string;
  content: string;
};

const ContactPage: NextPage = () => {
  const router = useRouter();
  const form = useForm<FormFields>();

  const { popup } = useContext(StoreContext);

  const submit: SubmitHandler<FormFields> = async (input) => {
    popup.setContent(<Loader />);

    try {
      const result = await fetch(url("api/contact"), {
        method: "POST",
        body: JSON.stringify(input),
      });
      const data = await result.json();

      if (data.isSuccess) {
        popup.setContent(null);
        router.push("/contact/thanks");
      } else {
        popup.setContent(
          <Message
            text="上手く問い合わせできませんでした。<br/>もう一度お試しください。"
            onClose={() => popup.setContent(null)}
          />
        );
      }
    } catch (e) {
      popup.setContent(
        <Message
          text="上手く問い合わせできませんでした。<br/>もう一度お試しください。"
          onClose={() => popup.setContent(null)}
        />
      );
    }
  };

  return (
    <App>
      <Page
        title="お問い合わせ | ヤナガワ村 | 群馬県高崎市の商店街・飲み屋街"
        description="ヤナガワ村へのお問い合わせはこちらから。群馬県高崎市柳川町や中央銀座通り周辺の商店街・飲み屋街エリア「ヤナガワ村」です。高崎市で人気の観光スポットや、美味しい飲食店・居酒屋、イベント等の情報をお届けします。"
        path="contact"
        ogType="article"
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
                      <label htmlFor="email">メールアドレス</label>
                    </div>

                    <div className="input">
                      <input
                        type="email"
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
                    <div className="label">
                      <label htmlFor="tel">電話番号</label>
                    </div>

                    <div className="input">
                      <input type="tel" id="tel" {...form.register("tel")} />
                      {form.formState.errors.tel && (
                        <p className="error">正しく入力してください</p>
                      )}
                    </div>
                  </div>

                  <div className="line">
                    <div className="label required">
                      <label htmlFor="address">ご住所</label>
                    </div>

                    <div className="input">
                      <input
                        type="text"
                        id="address"
                        {...form.register("address", {
                          required: true,
                          minLength: 1,
                          maxLength: 100,
                        })}
                      />
                      {form.formState.errors.address && (
                        <p className="error">正しく入力してください</p>
                      )}
                    </div>
                  </div>

                  <div className="line">
                    <div className="label required">
                      <label htmlFor="body">お問い合わせ内容</label>
                    </div>

                    <div className="input">
                      <textarea
                        id="content"
                        rows={10}
                        {...form.register("content", {
                          required: true,
                          minLength: 1,
                          maxLength: 1000,
                        })}
                      />
                      {form.formState.errors.content && (
                        <p className="error">正しく入力してください</p>
                      )}
                    </div>
                  </div>

                  <div className="line">
                    <div className="label"></div>

                    <div className="input checkbox">
                      <input type="checkbox" id="privacy" required />
                      <label htmlFor="privacy">
                        <a
                          href={url("privacy-policy")}
                          target="_blank"
                          rel="noreferrer"
                        >
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
    </App>
  );
};

export default ContactPage;
